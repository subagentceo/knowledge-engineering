---
title: Network policies
description: Configure Network policies in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network policies

Note

To enable this feature, download and deploy the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on your devices.

Network policies control TCP and UDP traffic between your users and network destinations. Use them to allow or block non-HTTP traffic such as SSH, RDP, and database connections based on IP addresses, ports, and protocols.

Because Cloudflare One [integrates with your identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/), you can also create identity-based network policies. This allows you to control access to non-HTTP resources on a per-user basis regardless of the user's location or device.

A network policy consists of an **Action** and a logical expression that determines the scope of the action. To build an expression, choose a **Selector** and an **Operator**, then enter a value or range of values in the **Value** field. You can use **And** and **Or** logical operators to evaluate multiple conditions.

* [Actions](#actions)
* [Selectors](#selectors)
* [Comparison operators](#comparison-operators)
* [Value](#value)
* [Logical operators](#logical-operators)

If a condition in an expression joins a query attribute (such as _Source IP_) and a response attribute (such as _Resolved IP_), then the condition will be evaluated when the response is received.

Terraform provider v4 precedence limitation

To avoid conflicts, version 4 of the Terraform Cloudflare provider applies a hash calculation to policy precedence. For example, a precedence of `1000` may become `1000901`. This can cause errors when reordering policies. To avoid this issue, manually set the precedence of policies created with Terraform using the [Update a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/update/) endpoint.

To ensure your precedence is set correctly, Cloudflare recommends [upgrading your Terraform provider to version 5 ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/guides/version-5-upgrade).

## Actions

Like actions in DNS and HTTP policies, actions in network policies define which decision you want to apply to a given set of elements. You can assign one action per policy.

### Allow

API value: `allow`

Available selectors

**Traffic**

* [Access Infrastructure Target](#access-infrastructure-target)
* [Access Private App](#access-private-app)
* [Application](#application)
* [Content Categories](#content-categories)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [Destination Port](#destination-port)
* [Detected Protocol](#detected-protocol)
* [Protocol](#protocol)
* [Proxy Endpoint](#proxy-endpoint)
* [Security Risks](#security-risks)
* [SNI](#sni)
* [SNI Domain](#sni-domain)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [Source Port](#source-port)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

Policies with Allow actions allow network traffic to reach certain IPs or ports. In a default-block configuration, Allow policies define the exceptions — traffic that does not match an Allow policy will be blocked by a lower-priority catch-all Block policy. For example, the following configuration allows specific users to reach a given IP address:

| Selector       | Operator | Value          | Logic | Action |
| -------------- | -------- | -------------- | ----- | ------ |
| Destination IP | in       | 92.100.02.102  | And   | Allow  |
| Email          | in       | \*@example.com |       |        |

### Audit SSH Deprecated

API value: `audit_ssh`

Available selectors

**Traffic**

* [Application](#application)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [Source Port](#source-port)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

Warning

Gateway no longer supports the Audit SSH action for new policies. To log your SSH traffic, Cloudflare recommends deploying [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) for your SSH server and configuring [SSH command logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#ssh-command-logs).

Policies with Audit SSH actions allow administrators to log SSH traffic. Gateway will detect SSH traffic over port `22`. For example, the following configuration logs SSH commands sent to a given IP address:

| Selector       | Operator | Value        | Action    |
| -------------- | -------- | ------------ | --------- |
| Destination IP | in       | 203.0.113.83 | Audit SSH |

Gateway only audits SSH traffic over port `22`. Non-standard ports, including those specified with the [Destination Port selector](#destination-port), are not supported.

For more information on SSH logging, refer to [Configure SSH proxy and command logs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/ssh-logging/).

### Block

API value: `block`

Available selectors

**Traffic**

* [Access Infrastructure Target](#access-infrastructure-target)
* [Access Private App](#access-private-app)
* [Application](#application)
* [Content Categories](#content-categories)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [Destination Port](#destination-port)
* [Detected Protocol](#detected-protocol)
* [Protocol](#protocol)
* [Proxy Endpoint](#proxy-endpoint)
* [Security Risks](#security-risks)
* [SNI](#sni)
* [SNI Domain](#sni-domain)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [Source Port](#source-port)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

Policies with Block actions block network traffic from reaching certain IPs or ports. For example, the following configuration blocks all traffic directed to port 443:

| Selector         | Operator | Value | Action |
| ---------------- | -------- | ----- | ------ |
| Destination Port | in       | 443   | Block  |

#### Cloudflare One Client block notifications

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/plans/zero-trust-services/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Traffic and DNS mode Traffic only mode                                                                                             | Enterprise                                                                  |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2024.1.159.0           |
| macOS    | ✅            | 2024.1.160.0           |
| Linux    | ❌            |                        |
| iOS      | ✅            | 1.7                    |
| Android  | ✅            | 1.4                    |
| ChromeOS | ✅            | 1.4                    |

Turn on **Display block notification for Cloudflare One Client** to display notifications for Gateway block events. Blocked users will receive an operating system notification from the Cloudflare One Client with a custom message you set. If you do not set a custom message, the Cloudflare One Client will display a default message. Custom messages must be 100 characters or less. The Cloudflare One Client will only display one notification per minute.

Upon selecting the notification, the Cloudflare One Client will direct your users to the [Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/) you have configured. Optionally, you can direct users to a custom URL, such as an internal support form.

When you turn on **Send policy context**, Gateway will append details of the matching request to the redirected URL as a query string. Not every context field will be included. Potential policy context fields include:

Policy context fields

| Field                 | Definition                                                                                                                                       | Example                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| User email            | Email of the user that made the query.                                                                                                           | &cf\_user\_email=user@example.com                                    |
| Site URL              | Full URL of the original HTTP request or domain name in DNS query.                                                                               | &cf\_site\_uri=https%3A%2F%2Fmalware.testcategory.com%2F             |
| URL category          | [Domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) of the URL to be redirected.           | &cf\_request\_categories=New%20Domains,Newly%20Seen%20Domains        |
| Original HTTP referer | For HTTP traffic, the original HTTP referer header of the HTTP request.                                                                          | &cf\_referer=https%3A%2F%2Fexample.com%2F                            |
| Rule ID               | ID of the Gateway policy that matched the request.                                                                                               | &cf\_rule\_id=6d48997c-a1ec-4b16-b42e-d43ab4d071d1                   |
| Source IP             | Source IP address of the device that matched the policy.                                                                                         | &cf\_source\_ip=203.0.113.5                                          |
| Device ID             | UUID of the device that matched the policy.                                                                                                      | &cf\_device\_id=6d48997c-a1ec-4b16-b42e-d43ab4d071d1                 |
| Application names     | Name of the application the redirected domain corresponds to, if any.                                                                            | &cf\_application\_name=Salesforce                                    |
| Filter                | The traffic type filter that triggered the block.                                                                                                | &cf\_filter=http, &cf\_filter=dns, &cf\_filter=av, or &cf\_filter=l4 |
| Account ID            | [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) of the associated Zero Trust account. | &cf\_account\_id=d57c3de47a013c03ca7e237dd3e61d7d                    |
| Query ID              | ID of the DNS query for which the redirect took effect.                                                                                          | &cf\_query\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3                  |
| Connection ID         | ID of the proxy connection for which the redirect took effect.                                                                                   | &cf\_connection\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3             |
| Request ID            | ID of the HTTP request for which the redirect took effect.                                                                                       | &cf\_request\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3                |

Ensure that your operating system allows notifications for the Cloudflare One Client. Your device may not display notifications if focus, do not disturb, or screen sharing settings are turned on. To turn on client notifications on macOS devices running DisplayLink software, you may have to allow system notifications when mirroring your display. For more information, refer to the [macOS documentation ↗](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac).

### Network Override

API value: `l4_override`

Available selectors

**Traffic**

* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [Destination Port](#destination-port)
* [Protocol](#protocol)
* [SNI](#sni)
* [SNI Domain](#sni-domain)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [Source Port](#source-port)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

Policies with Network Override actions override traffic directed to or coming from certain IPv4/IPv6 addresses or ports. Destination IPs can be public IPs or private IPs connected to your Zero Trust network. For example, the following configuration overrides traffic sent to a public IP with a private IP based on a user's identity:

| Selector       | Operator | Value          | Logic | Action           |
| -------------- | -------- | -------------- | ----- | ---------------- |
| Destination IP | in       | 95.92.143.151  | And   | Network Override |
| User Email     | in       | \*@example.com | And   |                  |
| Override IP    | 10.0.0.1 |                |       |                  |

Warning

If the override destination IP is unreachable, Gateway still rewrites the destination but does not log the connection. The traffic fails silently with no log entry. Verify that your override IP is reachable before deploying this policy.

Gateway will only log successful override connections in your [network logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#network-logs).

## Selectors

Gateway matches network traffic against the following selectors, or criteria.

### Access Infrastructure Target

All [targets](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#1-add-a-target) secured by an [Access infrastructure application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/).

| UI name                      | API example   |
| ---------------------------- | ------------- |
| Access Infrastructure Target | access.target |

### Access Private App

All destination IPs and hostnames secured by an [Access self-hosted private application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/).

| UI name                                     | API example         |
| ------------------------------------------- | ------------------- |
| Self-hosted Access App with Private Address | access.private\_app |

### Application

You can apply network policies to a growing list of popular web applications. Refer to [Application and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/) for more information.

| UI name     | API example                 |
| ----------- | --------------------------- |
| Application | any(app.ids\[\*\] in {505}) |

### Content Categories

Applications within a specific [security category](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#content-categories) as categorized by [Cloudflare Radar](https://developers.cloudflare.com/radar/glossary/#content-categories).

| UI name            | API example                                  |
| ------------------ | -------------------------------------------- |
| Content Categories | any(net.fqdn.content\_category\[\*\] in {1}) |

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

### Detected Protocol

The inferred network protocol based on Cloudflare's [protocol detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/).

| UI name           | API example                     |
| ----------------- | ------------------------------- |
| Detected Protocol | net.protocol.detection == "ssh" |

### Device Posture

With the Device Posture selector, admins can use signals from end-user devices to secure access to their internal and external resources. For example, a security admin can choose to limit all access to internal applications based on whether specific software is installed on a device and/or if the device or software are configured in a particular way.

For more information on device posture checks, refer to [Device posture](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

| UI name                      | API example                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Passed Device Posture Checks | any(device\_posture.checks.failed\[\*\] in {"1308749e-fcfb-4ebc-b051-fe022b632644"}), any(device\_posture.checks.passed\[\*\] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})" |

### Protocol

The protocol used to send the packet.

| UI name  | API example           |
| -------- | --------------------- |
| Protocol | net.protocol == "tcp" |

Note

To enable Gateway filtering on TCP and UDP, go to **Traffic policies** \> **Traffic settings** \> **Allow Secure Web Gateway to proxy traffic**. Network policies apply to all enabled protocols unless you use the **Protocol** selector within a policy.

### Proxy Endpoint

The [proxy server](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) where your browser forwards HTTP traffic.

| UI name        | API example                                                 |
| -------------- | ----------------------------------------------------------- |
| Proxy Endpoint | proxy.endpoint == "3ele0ss56t.proxy.cloudflare-gateway.com" |

### Security Categories

Applications within a specific [security category](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories) as categorized by [Cloudflare Radar](https://developers.cloudflare.com/radar/glossary/#content-categories).

| UI name             | API example                                   |
| ------------------- | --------------------------------------------- |
| Security Categories | any(net.fqdn.security\_category\[\*\] in {1}) |

### SNI

Server Name Indication (SNI) is the hostname a client sends during the TLS handshake, before encryption begins. Gateway reads the SNI to identify the destination of encrypted traffic. The SNI selector matches the exact hostname.

By default, SNI selectors only apply to HTTPS traffic on port `443`. To inspect traffic on every port, turn on [protocol detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) and choose to [inspect on all ports](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports).

| UI name | API example                       |
| ------- | --------------------------------- |
| SNI     | net.sni.host == "www.example.com" |

### SNI Domain

The domain whose Server Name Indication (SNI) header Gateway will filter traffic against. For example, a rule for `example.com` will match `example.com`, `www.example.com`, and `my.test.example.com`.

By default, SNI selectors only apply to HTTPS traffic on port `443`. To inspect traffic on every port, turn on [protocol detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) and choose to [inspect on all ports](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports).

| UI name    | API example                      |
| ---------- | -------------------------------- |
| SNI Domain | net.sni.domains == "example.com" |

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

Use this selector to apply network policies to a private IP address, assigned by a user's local network, that requests arrive to Gateway from.

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

Note

The _in_ operator allows you to specify IP addresses or networks using CIDR notation (for example, `10.0.0.0/8` matches all IPs from `10.0.0.0` to `10.255.255.255`).

## Value

In the **Value** field, you can input a single value when using an equality comparison operator (such as _is_) or multiple values when using a containment comparison operator (such as _in_). Additionally, you can use [regular expressions](#regular-expressions) (or regex) to specify a range of values for supported selectors.

### Regular expressions

Regular expressions are evaluated using Rust. The Rust implementation is slightly different than regex libraries used elsewhere. For more information, refer to our guide for [Wildcards](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/#wildcards). To evaluate if your regex matches, you can use [Rustexp ↗](https://rustexp.lpil.uk/).

If you want to match multiple values, you can use the pipe symbol (`|`) as an OR operator. You do not need to use an escape character (`\`) before the pipe symbol. For example, the following expression evaluates to true when the SNI host matches either `.*whispersystems.org` or `.*signal.org`:

| Selector | Operator      | Value                                |
| -------- | ------------- | ------------------------------------ |
| SNI      | matches regex | .\*whispersystems.org\|.\*signal.org |

In addition to regular expressions, you can use [logical operators](#logical-operators) to match multiple values.

## Logical operators

To evaluate multiple conditions in an expression, select the **And** logical operator. These expressions can be compared further with the **Or** logical operator.

| Operator | Meaning                                       |
| -------- | --------------------------------------------- |
| And      | match all of the conditions in the expression |
| Or       | match any of the conditions in the expression |

The **Or** operator will only work with conditions in the same expression group. For example, you cannot compare conditions in **Traffic** with conditions in **Identity** or **Device Posture**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#page","headline":"Network policies · Cloudflare One docs","description":"Configure Network policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/network-policies/","name":"Network policies"}}]}
```
