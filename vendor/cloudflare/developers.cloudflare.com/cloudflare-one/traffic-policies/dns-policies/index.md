---
title: DNS policies
description: Configure DNS policies in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS policies

DNS policies let you control which websites and services your users can reach by inspecting their DNS queries — the lookups that translate domain names into IP addresses. Because DNS policies act at the lookup stage, they work across all protocols and applications, not just web browsers.

When a user makes a DNS request, [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) matches the request against the DNS policies you have set up for your organization. If the domain does not belong to any blocked categories, or if it matches an Allow or Override policy, the user's client receives an address based on DNS resolution from Cloudflare's public DNS resolver (1.1.1.1). You can also use a [resolver policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to redirect DNS requests to a custom server.

A DNS policy consists of an **Action** as well as a logical expression that determines the scope of the action. To build an expression, you need to choose a **Selector** and an **Operator**, and enter a value or range of values in the **Value** field. You can use **And** and **Or** logical operators to evaluate multiple conditions.

* [Actions](#actions)
* [Selectors](#selectors)
* [Comparison operators](#comparison-operators)
* [Value](#value)
* [Logical operators](#logical-operators)

When creating a DNS policy, you can select as many security risk categories and content categories as needed to fully secure your network. Unless a more specific selector is configured in a policy (for example, _User Email_ or _Source IP_), then the policy will be evaluated against all DNS queries that reach Gateway from your organization.

If a condition in an expression joins a query attribute (such as _Source IP_) and a response attribute (such as _Resolved IP_), then the condition will be evaluated when the response is received.

Terraform provider v4 precedence limitation

To avoid conflicts, version 4 of the Terraform Cloudflare provider applies a hash calculation to policy precedence. For example, a precedence of `1000` may become `1000901`. This can cause errors when reordering policies. To avoid this issue, manually set the precedence of policies created with Terraform using the [Update a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/update/) endpoint.

To ensure your precedence is set correctly, Cloudflare recommends [upgrading your Terraform provider to version 5 ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/guides/version-5-upgrade).

## Actions

The action determines what Gateway does when a DNS query matches your policy conditions. You can assign one action per policy.

These are the action types you can choose from:

* [Allow](#allow)
* [Block](#block)
* [Override](#override)
* [Safe Search](#safe-search)
* [YouTube Restricted Mode](#youtube-restricted-mode)

### Allow

API value: `allow`

Available selectors

**Traffic**

* [Application](#application)
* [Authoritative Nameserver IP](#authoritative-nameserver-ip)
* [Content Categories](#content-categories)
* [DNS CNAME Response Value](#dns-cname-record)
* [DNS MX Response Value](#dns-mx-record)
* [DNS PTR Response Value](#dns-ptr-record)
* [DNS Resolver IP](#dns-resolver-ip)
* [DNS TXT Response Value](#dns-txt-record)
* [DOH Subdomain](#doh-subdomain)
* [Domain](#domain)
* [Host](#host)
* [Indicator Feeds](#indicator-feeds)
* [Location](#location)
* [Query Record Type](#query-record-type)
* [Resolved Continent IP Geolocation](#resolved-continent)
* [Resolved Country IP Geolocation](#resolved-country)
* [Resolved IP](#resolved-ip)
* [Request Context Categories](#request-context-categories)
* [Security Categories](#security-categories)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source IP](#source-ip)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

Policies with Allow actions explicitly permit DNS queries to resolve. Gateway uses a [first-match principle](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence), which means that if an Allow policy matches a query at a higher precedence than a Block policy, the query will be allowed to resolve. For example, the following configuration allows DNS queries to reach domains categorized as belonging to the Education content category:

| Selector           | Operator | Value       | Action |
| ------------------ | -------- | ----------- | ------ |
| Content Categories | in       | _Education_ | Allow  |

#### Disable DNSSEC validation

DNSSEC (Domain Name System Security Extensions) verifies that DNS responses have not been tampered with by checking a cryptographic signature attached to the record. When you select **Disable DNSSEC validation**, Gateway will resolve DNS queries even if the signature cannot be validated. We do not recommend disabling DNSSEC validation unless you know that the validation failure is due to DNSSEC configuration issues and not malicious attacks.

### Block

API value: `block`

Available selectors

**Traffic**

* [Application](#application)
* [Authoritative Nameserver IP](#authoritative-nameserver-ip)
* [Content Categories](#content-categories)
* [DNS CNAME Response Value](#dns-cname-record)
* [DNS MX Response Value](#dns-mx-record)
* [DNS PTR Response Value](#dns-ptr-record)
* [DNS Resolver IP](#dns-resolver-ip)
* [DNS TXT Response Value](#dns-txt-record)
* [DOH Subdomain](#doh-subdomain)
* [Domain](#domain)
* [Host](#host)
* [Indicator Feeds](#indicator-feeds)
* [Location](#location)
* [Query Record Type](#query-record-type)
* [Resolved Continent IP Geolocation](#resolved-continent)
* [Resolved Country IP Geolocation](#resolved-country)
* [Resolved IP](#resolved-ip)
* [Request Context Categories](#request-context-categories)
* [Security Categories](#security-categories)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source IP](#source-ip)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

Policies with Block actions prevent DNS queries from resolving for destinations you specify within the Selector and Value fields. For example, the following configuration blocks DNS queries from reaching domains categorized as belonging to the Adult Themes content category:

| Selector           | Operator | Value          | Action |
| ------------------ | -------- | -------------- | ------ |
| Content Categories | in       | _Adult Themes_ | Block  |

#### Custom block page

When choosing the Block action, turn on **Modify Gateway block behavior** to respond to queries with a block page to display to users who go to blocked websites. Optionally, you can override your global block page setting with a URL redirect for the specific DNS policy. For more information, refer to [Block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/).

If the block page is turned off for a policy, Gateway will respond to blocked queries with an `A` record (IPv4) of `0.0.0.0` or an `AAAA` record (IPv6) of `::`. Because no server responds at these addresses, the browser will display its default connection error page.

To block the resolution of queries for DNS records with types other than `A` or `AAAA`, Gateway will respond with the `REFUSED (RCODE:5)` DNS return code. Gateway will block the request but will not display a block page.

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

### Override

API value: `override`

Available selectors

The Override action cannot be used with selectors evaluated during or after DNS resolution.

**Traffic**

* [Application](#application)
* [Content Categories](#content-categories)
* [DNS Resolver IP](#dns-resolver-ip)
* [DOH Subdomain](#doh-subdomain)
* [Domain](#domain)
* [Host](#host)
* [Location](#location)
* [Query Record Type](#query-record-type)
* [Resolved Continent IP Geolocation](#resolved-continent)
* [Resolved Country IP Geolocation](#resolved-country)
* [Security Categories](#security-categories)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source IP](#source-ip)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

Policies with Override actions replace the real DNS answer with a destination you specify. When a user queries a domain that matches the policy, Gateway returns your custom IP address or hostname instead of the actual DNS record. For example, you can provide a custom response IP of `1.2.3.4` for all queries to `www.example.com` with the following policy:

| Selector | Operator | Value           | Action   | Override Hostname |
| -------- | -------- | --------------- | -------- | ----------------- |
| Hostname | is       | www.example.com | Override | 1.2.3.4           |

Note

The Override action only supports queries for A, AAAA, and HTTPS records. If a query for a different type of record matches an Override policy, Gateway will return REFUSED.

### Safe Search

API value: `safesearch`

Available selectors

**Traffic**

* [Application](#application)
* [Content Categories](#content-categories)
* [DNS Resolver IP](#dns-resolver-ip)
* [DOH Subdomain](#doh-subdomain)
* [Domain](#domain)
* [Host](#host)
* [Location](#location)
* [Query Record Type](#query-record-type)
* [Resolved Continent IP Geolocation](#resolved-continent)
* [Resolved Country IP Geolocation](#resolved-country)
* [Security Categories](#security-categories)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source IP](#source-ip)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

SafeSearch is a feature of search engines that helps you filter explicit or offensive content. When you enable SafeSearch, the search engine filters explicit or offensive content and returns search results that are safe for children or at work.

You can use Cloudflare Gateway to enable SafeSearch on search engines like Google, Bing, Yandex, YouTube and DuckDuckGo. For example, to enable SafeSearch for Google, you can create the following policy:

| Selector | Operator | Value      | Action      |
| -------- | -------- | ---------- | ----------- |
| Domain   | is       | google.com | Safe Search |

### YouTube Restricted Mode

API value: `ytrestricted`

Available selectors

**Traffic**

* [Application](#application)
* [Content Categories](#content-categories)
* [DNS Resolver IP](#dns-resolver-ip)
* [DOH Subdomain](#doh-subdomain)
* [Domain](#domain)
* [Host](#host)
* [Location](#location)
* [Query Record Type](#query-record-type)
* [Resolved Continent IP Geolocation](#resolved-continent)
* [Resolved Country IP Geolocation](#resolved-country)
* [Security Categories](#security-categories)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source IP](#source-ip)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

Similarly, you can enforce YouTube Restricted mode by choosing the _YouTube Restricted_ action. YouTube Restricted Mode is an automated filter for adult and offensive content built into YouTube. To enable YouTube Restricted Mode, you could set up a policy like the following:

| Selector   | Operator | Value       | Action             |
| ---------- | -------- | ----------- | ------------------ |
| DNS Domain | is       | youtube.com | YouTube Restricted |

This setup ensures users will be blocked from accessing offensive sites using DNS.

## Selectors

Gateway matches DNS queries against the following selectors, or criteria.

Each selector is evaluated during a specific phase of the DNS resolution process:

* **Before DNS resolution** — Gateway inspects properties of the incoming query (for example, the domain name or source IP) before looking up the answer.
* **During DNS resolution** — Gateway inspects information discovered while resolving the query (for example, the authoritative nameserver IP).
* **After DNS resolution** — Gateway inspects the DNS answer (for example, the resolved IP or CNAME record) after resolution completes.

The Override action cannot be used with selectors evaluated during or after DNS resolution, because the override must be applied before the answer is returned. For more information on how evaluation phase interacts with precedence, refer to [order of enforcement](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#dns-policies).

### Application

You can apply DNS policies to a growing list of popular web applications. Refer to [Application and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/) for more information.

| UI name     | API example                 | Evaluation phase      |
| ----------- | --------------------------- | --------------------- |
| Application | any(app.ids\[\*\] in {505}) | Before DNS resolution |

### Authoritative Nameserver IP

Use this selector to match against the IP address of the authoritative nameserver IP address.

| UI name                     | API example                                | Evaluation phase      |
| --------------------------- | ------------------------------------------ | --------------------- |
| Authoritative Nameserver IP | dns.authoritative\_ns\_ips == 198.51.100.0 | During DNS resolution |

### Content Categories

Use this selector to filter domains belonging to specific [content categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#content-categories).

| UI name            | API example                             | Evaluation phase      |
| ------------------ | --------------------------------------- | --------------------- |
| Content Categories | any(dns.content\_category\[\*\] in {1}) | Before DNS resolution |

When using an Allow or Block action, you can optionally [block IP addresses](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#filter-traffic-by-resolved-ip-category) or [filter categories for CNAME records](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#ignore-cname-domain-categories).

### DNS CNAME Record

Use this selector to filter DNS responses by their `CNAME` records.

| UI name                  | API example                                                    | Evaluation phase     |
| ------------------------ | -------------------------------------------------------------- | -------------------- |
| DNS CNAME Response Value | any(dns.response.cname\[\*\] in {"www.apple.com.edgekey.net"}) | After DNS resolution |

Note

If one CNAME record points to another CNAME record, each record in the chain will be evaluated. For example, if `abc.example.com` points to `xyz.example.com`, then your DNS policy will evaluate both `abc.example.com` and `xyz.example.com`.

### DNS MX Record

Use this selector to filter DNS responses by their `MX` records.

| UI name               | API example                                                  | Evaluation phase     |
| --------------------- | ------------------------------------------------------------ | -------------------- |
| DNS MX Response Value | any(dns.response.mx\[\*\] in {"gmail-smtp-in.l.google.com"}) | After DNS resolution |

### DNS PTR Record

Use this selector to filter DNS responses by their `PTR` records.

| UI name                | API example                                                 | Evaluation phase     |
| ---------------------- | ----------------------------------------------------------- | -------------------- |
| DNS PTR Response Value | any(dns.response.ptr\[\*\] in {"255.2.0.192.in-addr.arpa"}) | After DNS resolution |

### DNS Resolver IP

Use this selector to apply policies to DNS queries that arrived to your Gateway Resolver IP address aligned with a registered DNS location. For most Gateway customers, this is an IPv4 anycast address and policies created using this IPv4 address will apply to all DNS locations. However, each DNS location has a dedicated IPv6 address and some Gateway customers have been supplied with a dedicated IPv4 address — these both can be used to apply policies to specific registered DNS locations.

| UI name         | API example                                 | Evaluation phase      |
| --------------- | ------------------------------------------- | --------------------- |
| DNS Resolver IP | any(dns.resolved\_ip\[\*\] == 198.51.100.0) | Before DNS resolution |

### DNS TXT Record

Use this selector to filter DNS responses by their `TXT` records.

| UI name                | API example                                   | Evaluation phase     |
| ---------------------- | --------------------------------------------- | -------------------- |
| DNS TXT Response Value | any(dns.response.txt\[\*\] in {"your\_text"}) | After DNS resolution |

### DoH Subdomain (DNS over HTTPS)

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

### Indicator Feeds

Use this selector to match against custom indicator feeds.

You can use a [publicly available indicator feed](https://developers.cloudflare.com/security-center/indicator-feeds/#publicly-available-feeds) or a custom indicator feed assigned to your account by a designated third-party vendor. For more information on indicator feeds, refer to [Custom Indicator Feeds](https://developers.cloudflare.com/security-center/indicator-feeds/).

| UI name         | API example         | Evaluation phase      |
| --------------- | ------------------- | --------------------- |
| Indicator Feeds | dns.indicator\_feed | Before DNS resolution |

When using an Allow or Block action, you can optionally [block IP addresses](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#filter-traffic-by-resolved-ip-category) or [filter categories for CNAME records](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#ignore-cname-domain-categories).

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

### Resolved Continent

Use this selector to filter based on the continent that the query resolves to. Geolocation is determined from the IP address in the response. To specify a continent, enter its two-letter code into the **Value** field:

* AF - Africa
* AN - Antarctica
* AS - Asia
* EU - Europe
* NA - North America
* OC - Oceania
* SA - South America
* T1 - Tor network

| UI name                           | API example                   | Evaluation phase     |
| --------------------------------- | ----------------------------- | -------------------- |
| Resolved Continent IP Geolocation | dns.dst.geo.continent == "EU" | After DNS resolution |

### Resolved Country

Use this selector to filter based on the country that the query resolves to. Geolocation is determined from the IP address in the response. To specify a country, enter its [ISO 3166-1 Alpha 2 code ↗](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                         | API example                 | Evaluation phase     |
| ------------------------------- | --------------------------- | -------------------- |
| Resolved Country IP Geolocation | dns.dst.geo.country == "RU" | After DNS resolution |

### Resolved IP

Use this selector to filter based on the IP addresses that the query resolves to.

| UI name     | API example                                  | Evaluation phase     |
| ----------- | -------------------------------------------- | -------------------- |
| Resolved IP | any(dns.resolved\_ips\[\*\] == 198.51.100.0) | After DNS resolution |

### Request Context Categories

Use this selector to match a dynamic list of [category IDs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#category-and-subcategory-ids) sent in the [EDNS (Extension Mechanisms for DNS) ↗](https://datatracker.ietf.org/doc/html/rfc6891) portion of a DNS query. EDNS allows extra metadata to be attached to a DNS query beyond the standard fields. Gateway reads category IDs from the EDNS OPT code `65050`.

| UI name                    | API example                                   | Evaluation phase      |
| -------------------------- | --------------------------------------------- | --------------------- |
| Request Context Categories | dns.categories\_in\_request\_context\_matches | Before DNS resolution |

### Security Categories

Use this selector to match domains (and optionally, [IP addresses](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#filter-traffic-by-resolved-ip-category)) belonging to specific [security categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories).

| UI name             | API example                              | Evaluation phase      |
| ------------------- | ---------------------------------------- | --------------------- |
| Security Categories | any(dns.security\_category\[\*\] in {1}) | Before DNS resolution |

When using an Allow or Block action, you can optionally [block IP addresses](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#filter-traffic-by-resolved-ip-category) or [filter categories for CNAME records](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#ignore-cname-domain-categories).

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

### Source Internal IP

Use this selector to apply policies to the source internal IP address of a DNS query. For example, this could be the private IP address of the hosts behind [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/) (formerly Magic WAN) or [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) used by your organization to send queries to Gateway.

| UI name            | API example                        | Evaluation phase      |
| ------------------ | ---------------------------------- | --------------------- |
| Source Internal IP | dns.src\_internal\_ip == 10.10.0.1 | Before DNS resolution |

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

## Limitations

### Third-party filtering conflict

Gateway will not properly filter traffic sent through third-party VPNs or other Internet filtering software, such as [iCloud Private Relay ↗](https://support.apple.com/102602) or [Google Chrome IP Protection ↗](https://github.com/GoogleChrome/ip-protection#ip-protection). To ensure your DNS policies apply to your traffic, Cloudflare recommends turning off software that may interfere with Gateway.

To turn off iCloud Private Relay, refer to the Apple user guides for [macOS ↗](https://support.apple.com/guide/mac-help/use-icloud-private-relay-mchlecadabe0/) or [iOS ↗](https://support.apple.com/guide/iphone/protect-web-browsing-icloud-private-relay-iph499d287c2/).

### Cloudflare WAN forwarding

To apply DNS policies to queries forwarded through [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/), you can either point your organization's DNS resolver to an IPv6, DNS over HTTPS (DoH), or DNS over TLS (DoT) endpoint or request a dedicated resolver IPv4 address. For more information, refer to [DNS resolver IPs and hostnames](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/).

### Fallback DNS

Some applications (for example, WhatsApp and Android Studio) have backup DNS servers built into their code. If their primary DNS query is blocked by Gateway, these apps automatically retry the query against their built-in DNS servers (for example, Google's `8.8.8.8`), which bypasses your policies entirely. To mitigate this behavior, you create a [Gateway Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to block outbound DNS traffic on TCP/UDP port `53` to the fallback DNS servers. For example, to block Google's fallback DNS servers:

| Selector         | Operator | Value            | Logic | Action |
| ---------------- | -------- | ---------------- | ----- | ------ |
| Protocol         | in       | _TCP_, _UDP_     | And   | Block  |
| Destination Port | in       | 53               | And   |        |
| Destination IP   | in       | 8.8.8.8, 8.8.4.4 |       |        |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#page","headline":"DNS policies · Cloudflare One docs","description":"Configure DNS policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/dns-policies/","name":"DNS policies"}}]}
```
