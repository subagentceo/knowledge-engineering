---
title: Resolver policies
description: Configure Resolver policies in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Resolver policies

Note

Only available on Enterprise plans.

By default, Gateway sends DNS requests to [1.1.1.1](https://developers.cloudflare.com/1.1.1.1/), Cloudflare's public DNS resolver, for resolution. Enterprise users can instead create Gateway policies to route DNS queries to custom resolvers.

flowchart TD
    %% Accessibility
    accTitle: How Gateway routes DNS queries
    accDescr: Flowchart describing the order Cloudflare Gateway routes a DNS query from an endpoint through DNS and resolver policies back to the user.

    %% Flowchart
    user(["User"])-->endpoint[/"Gateway DNS endpoint"/]

    endpoint-->query["DNS policy (query)"]

    query-->resolver["Resolver policy"]

    resolver--"Routes to </br>custom resolver"-->response["DNS policy (response)"]

    response--"Returns response"-->user

Gateway will route user traffic to your configured DNS resolver based on the matching policy, even if your resolvers' IP addresses overlap.

## Use cases

You may use resolver policies if you require access to non-publicly routed domains, such as private network services or internal resources. You may also use resolver policies if you need to access a protected DNS service or want to simplify DNS management for multiple locations.

### Internal DNS Beta

[Cloudflare Internal DNS](https://developers.cloudflare.com/dns/internal-dns/) allows you to manage DNS records for internal resources on a private network. DNS zones configured in Internal DNS can only be queried by the Gateway resolver. With resolver policies, you can determine how Gateway resolves your organization's DNS queries to resolve to internal resources based on the context of the query, such as known source IPs for a geographic location.

To get started with resolving internal DNS queries with resolver policies, refer to [Get started](https://developers.cloudflare.com/dns/internal-dns/get-started/).

### Local Domain Fallback

Use resolver policies when your DNS server is reachable from Cloudflare's network — for example, through a Cloudflare Tunnel, IPsec/GRE tunnel, or the public Internet. Use [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) when the DNS server is only reachable from the user's device.

If both Local Domain Fallback and resolver policies are configured for the same device, Cloudflare will apply your client-side Local Domain Fallback rules first. If you onboard DNS queries to Gateway with the Cloudflare One Client and route them with resolver policies, the source IP of the queries will be the IP address assigned by the Cloudflare One Client.

Local Domain Fallback or Gateway Resolver policies?

If your DNS server can be configured to connect to a Cloudflare on-ramp, Cloudflare recommends using Gateway Resolver policies rather than Local Domain Fallback. Gateway Resolver policies provide more visibility by allowing you to log and review DNS traffic.

## Resolver connections

Resolver policies support TCP and UDP connections. Custom resolvers can point to the Internet via IPv4 or IPv6, or to a private network service, such as a [Magic tunnel](https://developers.cloudflare.com/magic-transit/how-to/configure-tunnel-endpoints/). Policies default to port `53`. You can change which port your resolver uses by customizing it in your policy.

You can protect your authoritative nameservers from DDoS attacks by enabling [DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/).

### Cloudflare Tunnel

You can configure connections to a private resolver connected to Cloudflare with [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/). To ensure `cloudflared` can route UDP traffic to your resolver, connect your tunnel via [QUIC](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#protocol).

For more information on connecting a private DNS resolver to Cloudflare with Cloudflare Tunnel, refer to [Private DNS](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/private-dns/).

### Cloudflare WAN

To enable connections to a private resolver connected to Cloudflare via [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/), contact your account team.

### Available DNS endpoints

Resolver policies can route queries for resolution from the following DNS endpoints:

* IPv4
* IPv6
* [DNS over HTTPS (DoH)](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-https/)
* [DNS over TLS (DoT)](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-tls/)
* DNS queries generated by Cloudflare [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) and [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/)
* DNS queries generated by [proxy endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/)

Gateway will filter, resolve, and log your queries regardless of endpoint.

## Create a resolver policy

Virtual network limitation

Resolver policies do not automatically update when you change the virtual networks associated with a route. If you move a route from one virtual network to another, the resolver policy will still reference the old virtual network. You will need to manually remove and recreate the resolver policy to update the route.

To create a resolver policy:

* [ Dashboard ](#tab-panel-7692)
* [ Terraform (v5) ](#tab-panel-7693)

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

For more information on creating a DNS policy, refer to [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/).

Terraform provider v4 precedence limitation

To avoid conflicts, version 4 of the Terraform Cloudflare provider applies a hash calculation to policy precedence. For example, a precedence of `1000` may become `1000901`. This can cause errors when reordering policies. To avoid this issue, manually set the precedence of policies created with Terraform using the [Update a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/update/) endpoint.

To ensure your precedence is set correctly, Cloudflare recommends [upgrading your Terraform provider to version 5 ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/guides/version-5-upgrade).

## Selectors

### Content Categories

Use this selector to filter domains belonging to specific [content categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#content-categories).

| UI name            | API example                             | Evaluation phase      |
| ------------------ | --------------------------------------- | --------------------- |
| Content Categories | any(dns.content\_category\[\*\] in {1}) | Before DNS resolution |

### DNS Resolver IP

Use this selector to apply policies to DNS queries that arrived to your Gateway Resolver IP address aligned with a registered DNS location. For most Gateway customers, this is an IPv4 anycast address and policies created using this IPv4 address will apply to all DNS locations. However, each DNS location has a dedicated IPv6 address and some Gateway customers have been supplied with a dedicated IPv4 address — these both can be used to apply policies to specific registered DNS locations.

| UI name         | API example                                 | Evaluation phase      |
| --------------- | ------------------------------------------- | --------------------- |
| DNS Resolver IP | any(dns.resolved\_ip\[\*\] == 198.51.100.0) | Before DNS resolution |

### DoH Subdomain

Use this selector to match against DNS queries that arrive via DNS-over-HTTPS (DoH) destined for the DoH endpoint configured for each DNS location. For example, you can use a DNS location with a DoH endpoint of `abcdefg.cloudflare-gateway.com` by choosing the DoH Subdomain selector and inputting a value of `abcdefg`.

| UI name       | API example                     | Evaluation phase      |
| ------------- | ------------------------------- | --------------------- |
| DOH Subdomain | dns.doh\_subdomain == "abcdefg" | Before DNS resolution |

### Domain

Use this selector to match against a domain and all subdomains. For example, you can match `example.com` and its subdomains, such as `www.example.com`.

| UI name | API example                             | Evaluation phase      |
| ------- | --------------------------------------- | --------------------- |
| Domain  | any(dns.domains\[\*\] == "example.com") | Before DNS resolution |

Gateway policies do not support domains with non-Latin characters directly. To use a domain with non-Latin characters, add it to a [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/).

### Host

Use this selector to match against only the hostname specified. For example, you can match `test.example.com` but not `example.com` or `www.test.example.com`.

| UI name | API example               | Evaluation phase      |
| ------- | ------------------------- | --------------------- |
| Host    | dns.fqdn == "example.com" | Before DNS resolution |

Gateway policies do not support hostnames with non-Latin characters directly. To use a hostname with non-Latin characters, add it to a [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/).

Note

Some hostnames (`example.com`) will invisibly redirect to the www subdomain (`www.example.com`). To match this type of website, use the [Domain](#domain) selector instead of the Host selector.

### Location

Use this selector to apply policies to a specific [Gateway DNS location](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) or set of locations.

| UI name  | API example                                               | Evaluation phase      |
| -------- | --------------------------------------------------------- | --------------------- |
| Location | dns.location in {"location\_uuid\_1" "location\_uuid\_2"} | Before DNS resolution |

### Query Record Type

Use this selector to choose the DNS resource record type that you would like to apply policies against. For example, you can match `A` records for a domain but not `MX` records.

| UI name           | API example               | Evaluation phase      |
| ----------------- | ------------------------- | --------------------- |
| Query Record Type | dns.query\_rtype == "TXT" | Before DNS resolution |

### Security Categories

Use this selector to match domains (and optionally, [IP addresses](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#filter-traffic-by-resolved-ip-category)) belonging to specific [security categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories).

| UI name             | API example                              | Evaluation phase      |
| ------------------- | ---------------------------------------- | --------------------- |
| Security Categories | any(dns.security\_category\[\*\] in {1}) | Before DNS resolution |

### Source Continent

Use this selector to filter based on the continent where the query arrived to Gateway from. 

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

| UI name                         | API example                              | Evaluation phase      |
| ------------------------------- | ---------------------------------------- | --------------------- |
| Source Continent IP Geolocation | dns.src.geo.continent == "North America" | Before DNS resolution |

### Source Country

Use this selector to filter based on the country where the query arrived to Gateway from. 

Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a country, enter its [ISO 3166-1 Alpha-2 code ↗](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                       | API example                 | Evaluation phase      |
| ----------------------------- | --------------------------- | --------------------- |
| Source Country IP Geolocation | dns.src.geo.country == "RU" | Before DNS resolution |

### Source IP

Use this selector to apply policies to the source IP address of DNS queries. For example, this could be the WAN IP address of the stub resolver used by your organization to send queries to Gateway.

| UI name   | API example                 | Evaluation phase      |
| --------- | --------------------------- | --------------------- |
| Source IP | dns.src\_ip == 198.51.100.0 | Before DNS resolution |

### Users

Use these selectors to match against identity attributes.

| UI name           | API example                                                                                                     | Evaluation phase      |
| ----------------- | --------------------------------------------------------------------------------------------------------------- | --------------------- |
| User Email        | identity.email == "user@example.com"                                                                            | Before DNS resolution |
| User Name         | identity.name == "Test User"                                                                                    | Before DNS resolution |
| User Group IDs    | any(identity.groups\[\*\].id in {"group\_id"})                                                                  | Before DNS resolution |
| User Group Names  | any(identity.groups\[\*\].name in {"group\_name"})                                                              | Before DNS resolution |
| User Group Emails | any(identity.groups\[\*\].email in {"group@example.com"})                                                       | Before DNS resolution |
| SAML Attributes   | any(identity.saml\_attributes\["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"\] in {"Test User"}) | Before DNS resolution |

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

In the **Value** field, you can input a single value when using an equality comparison operator (such as _is_) or multiple values when using a containment comparison operator (such as _in_). Additionally, you can use [regular expressions](#regular-expressions) (or regex) to specify a range of values for supported selectors.

### Regular expressions

Regular expressions are evaluated using Rust. The Rust implementation is slightly different than regex libraries used elsewhere. For more information, refer to our guide for [Wildcards](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/#wildcards). To evaluate if your regex matches, you can use [Rustexp ↗](https://rustexp.lpil.uk/).

If you want to match multiple values, you can use the pipe symbol (`|`) as an OR operator. You do not need to use an escape character (`\`) before the pipe symbol. For example, the following expression evaluates to true when the hostname matches either `.*whispersystems.org` or `.*signal.org`:

| Selector | Operator      | Value                                |
| -------- | ------------- | ------------------------------------ |
| Host     | matches regex | .\*whispersystems.org\|.\*signal.org |

In addition to regular expressions, you can use [logical operators](#logical-operators) to match multiple values.

## Logical operators

To evaluate multiple conditions in an expression, select the **And** logical operator. These expressions can be compared further with the **Or** logical operator.

| Operator | Meaning                                       |
| -------- | --------------------------------------------- |
| And      | match all of the conditions in the expression |
| Or       | match any of the conditions in the expression |

The **Or** operator will only work with conditions in the same expression group. For example, you cannot compare conditions in **Traffic** with conditions in Identity.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#page","headline":"Resolver policies · Cloudflare One docs","description":"Configure Resolver policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS","IPv4","IPv6","QUIC"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/resolver-policies/","name":"Resolver policies"}}]}
```
