---
title: Common policies
description: Reference information for Common policies in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Common policies

The following Cloudflare Gateway DNS policies are commonly used to secure DNS traffic. Each example includes both dashboard and API instructions that you can adapt for your organization.

For a baseline set of recommended policies, refer to [Secure your Internet traffic and SaaS apps](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/recommended-dns-policies/).

Refer to the [DNS policies page](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) for a comprehensive list of other selectors, operators, and actions.

## Allow corporate domains

This policy allows users to access official corporate domains. By deploying the policy with high [order of precedence](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence), you ensure that employees can access trusted domains even if they fall under a blocked category like _Newly seen domains_ or _Login pages_.

* [ Dashboard ](#tab-panel-7567)
* [ API ](#tab-panel-7568)

| Selector | Operator | Value             | Action | Precedence |
| -------- | -------- | ----------------- | ------ | ---------- |
| Domain   | in list  | _Allowed domains_ | Allow  | 1          |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow corporate domains",

    "description": "Allow any internal corporate domains added to a list",

    "precedence": 0,

    "enabled": true,

    "action": "allow",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.domains[*] in $<LIST_UUID>)",

    "identity": ""

  }'


```

To get the UUIDs of your lists, use the [List Zero Trust lists](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/list/) endpoint.

## Block security threats

Block [security categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories) such as Command & Control, Botnet and Malware based on Cloudflare's threat intelligence.

* [ Dashboard ](#tab-panel-7591)
* [ API ](#tab-panel-7592)
* [ Terraform ](#tab-panel-7593)

| Selector            | Operator | Value                | Action |
| ------------------- | -------- | -------------------- | ------ |
| Security Categories | in       | _All security risks_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-DNS-SecurityCategories-Blocklist",

    "description": "Block security categories based on Cloudflare'\''s threat intelligence",

    "precedence": 20,

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})",

    "identity": ""

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "block_security_threats" {

  account_id  = var.cloudflare_account_id

  name        = "All-DNS-SecurityCategories-Blocklist"

  description = "Block security categories based on Cloudflare's threat intelligence"

  precedence  = 20

  enabled     = true

  action      = "block"

  filters     = ["dns"]

  traffic     = "any(dns.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})"

}


```

## Block content categories

The categories included in this policy are not always a security threat, but blocking them can help minimize the risk that your organization is exposed to. For more information, refer to [domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/).

* [ Dashboard ](#tab-panel-7594)
* [ API ](#tab-panel-7595)
* [ Terraform ](#tab-panel-7596)

| Selector           | Operator | Value                                                     | Action |
| ------------------ | -------- | --------------------------------------------------------- | ------ |
| Content Categories | in       | _Questionable Content_, _Security Risks_, _Miscellaneous_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-DNS-ContentCategories-Blocklist",

    "description": "Block common content categories that may pose a risk",

    "precedence": 30,

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.content_category[*] in {17 85 87 102 157 135 138 180 162 32 169 177 128 15 115 119 124 141 161})",

    "identity": ""

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "block_content_categories" {

  account_id  = var.cloudflare_account_id

  name        = "All-DNS-ContentCategories-Blocklist"

  description = "Block common content categories that may pose a risk"

  enabled     = true

  action      = "block"

  filters     = ["dns"]

  traffic     = "any(dns.content_category[*] in {17 85 87 102 157 135 138 180 162 32 169 177 128 15 115 119 124 141 161})"

  identity    = ""

}


```

## Block a dynamic list of categories

You can add a list of category IDs to the [EDNS (Extension Mechanisms for DNS) ↗](https://datatracker.ietf.org/doc/html/rfc6891) header of a request sent to Gateway as a JSON object using OPT code `65050`. EDNS allows extra metadata to be attached to a DNS query beyond the standard fields. For example:

```

{

  "categories": [2, 67, 125, 133]

}


```

With the [Request Context Categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#request-context-categories) selector, you can block the category IDs sent with EDNS. This is useful to filter by categories not known at the time of creating a policy, or to enforce device-specific DNS content filtering without reaching your account limit. When Gateway uses this selector to block a DNS query, the request will return an Extended DNS Error (EDE) Code 15 (`Blocked`), along with a field containing an array of the matched categories.

* [ Dashboard ](#tab-panel-7562)
* [ API ](#tab-panel-7563)
* [ Terraform ](#tab-panel-7564)

| Selector                 | Operator | Value     | Action |
| ------------------------ | -------- | --------- | ------ |
| Request Context Category | is       | _Present_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-DNS-Bock-Category-Matches-In-Request",

    "description": "Block all category matches in the request EDNS context",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "dns.categories_in_request_context_matches",

    "identity": ""

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "block_content_categories" {

  account_id  = var.cloudflare_account_id

  name        = "All-DNS-Bock-Category-Matches-In-Request"

  description = "Block all category matches in the request EDNS context"

  enabled     = true

  action      = "block"

  filters     = ["dns"]

  traffic     = "dns.categories_in_request_context_matches"

  identity    = ""

}


```

## Block unauthorized applications

Note

After seven days, view your [Shadow IT SaaS Analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/) and block additional applications based on what your users are accessing.

To minimize the risk of [shadow IT](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/), some organizations choose to limit their users' access to certain web-based tools and applications. For example, the following policy blocks known AI tools:

* [ Dashboard ](#tab-panel-7597)
* [ API ](#tab-panel-7598)
* [ Terraform ](#tab-panel-7599)

| Selector    | Operator | Value                     | Action |
| ----------- | -------- | ------------------------- | ------ |
| Application | in       | _Artificial Intelligence_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-DNS-Application-Blocklist",

    "description": "Block access to unauthorized AI applications",

    "precedence": 40,

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(app.type.ids[*] in {25})",

    "identity": ""

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "block_unauthorized_apps" {

  account_id  = var.cloudflare_account_id

  name        = "All-DNS-Application-Blocklist"

  description = "Block access to unauthorized AI applications"

  enabled     = true

  action      = "block"

  filters     = ["dns"]

  traffic     = "any(app.type.ids[*] in {25})"

  identity    = ""

}


```

## Block banned countries

You can implement policies to block websites hosted in countries categorized as high risk. The designation of such countries may result from your organization's requirements or through regulations including [EAR (Export Administration Regulations) ↗](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries), [OFAC (Office of Foreign Assets Control) ↗](https://orpa.princeton.edu/export-controls/sanctioned-countries), and [ITAR (International Traffic in Arms Regulations) ↗](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries). This policy blocks DNS queries that resolve to IP addresses geolocated in the countries you specify.

* [ Dashboard ](#tab-panel-7565)
* [ API ](#tab-panel-7566)

| Selector                        | Operator | Value                                                                                                                                                          | Action |
| ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Resolved Country IP Geolocation | in       | _Afghanistan_, _Belarus_, _Congo (Kinshasa)_, _Cuba_, _Iran_, _Iraq_, _Korea, North_, _Myanmar_, _Russian Federation_, _Sudan_, _Syria_, _Ukraine_, _Zimbabwe_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block banned countries",

    "description": "Block access to banned countries",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.dst.geo.country[*] in {\"AF\" \"BY\" \"CD\" \"CU\" \"IR\" \"IQ\" \"KP\" \"MM\" \"RU\" \"SD\" \"SY\" \"UA\" \"ZW\"})",

    "identity": ""

  }'


```

## Block top-level domains

Blocking [frequently misused ↗](https://www.spamhaus.org/statistics/tlds/) top-level domains (TLDs) — the last segment of a domain name, such as `.com` or `.ru` — can reduce security risks, especially when there is no discernible advantage to be gained from allowing access. Similarly, restricting access to specific country-level TLDs may be necessary to comply with regulations like [ITAR ↗](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries) or [OFAC ↗](https://orpa.princeton.edu/export-controls/sanctioned-countries).

* [ Dashboard ](#tab-panel-7569)
* [ API ](#tab-panel-7570)

| Selector | Operator      | Value                                                         | Logic | Action |
| -------- | ------------- | ------------------------------------------------------------- | ----- | ------ |
| Domain   | matches regex | \[.\](cn\|ru)$                                                | Or    | Block  |
| Domain   | matches regex | \[.\](rest\|hair|top|live|cfd|boats|beauty|mom|skin|okinawa)$ | Or    |        |
| Domain   | matches regex | \[.\](zip\|mobi)$                                             |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block top-level domains",

    "description": "Block top-level domains that are frequently used for malicious practices",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.domains[*] matches \"[.](cn|ru)$\") or any(dns.domains[*] matches \"[.](rest|hair|top|live|cfd|boats|beauty|mom|skin|okinawa)$\") or any(dns.domains[*] matches \"[.](zip|mobi)$\")",

    "identity": ""

  }'


```

## Block phishing attacks

To protect against [sophisticated phishing attacks ↗](https://blog.cloudflare.com/2022-07-sms-phishing-attacks/), you could prevent users from accessing phishing domains that are specifically targeting your organization. The following policy blocks specific keywords associated with an organization or its authentication services (such as _okta_, _2fa_, _cloudflare_ or _sso_), while still allowing access to official corporate domains.

* [ Dashboard ](#tab-panel-7571)
* [ API ](#tab-panel-7572)

| Selector | Operator      | Value                                          | Logic | Action |
| -------- | ------------- | ---------------------------------------------- | ----- | ------ |
| Domain   | not in list   | _Corporate Domains_                            | And   | Block  |
| Domain   | matches regex | .\*okta.\*\|.\*cloudflare.\*|.\*mfa.\*|.sso.\* |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block phishing attacks",

    "description": "Block attempts to phish specific domains targeting your organization",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "not(any(dns.domains[*] in $<LIST_UUID>)) and any(dns.domains[*] matches \".*okta.*\\|.*cloudflare.*\\|.*mfa.*\\|.sso.*\")",

    "identity": ""

  }'


```

To get the UUIDs of your lists, use the [List Zero Trust lists](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/list/) endpoint.

## Block online tracking

To safeguard user privacy, some organizations will block tracking domains such as `dig.whatsapp.com` as well as other tracking domains embedded at the OS level. This policy is implemented by creating a custom blocklist. Refer to [this repository ↗](https://github.com/nextdns/native-tracking-domains/tree/28991a0d5b2ab6d35588a74af82162ea7caff420/domains) for a list of widespread tracking domains that you can add to your blocklist.

* [ Dashboard ](#tab-panel-7573)
* [ API ](#tab-panel-7574)

| Selector | Operator | Value                  | Action |
| -------- | -------- | ---------------------- | ------ |
| Domain   | in list  | _Top tracking domains_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block online tracking",

    "description": "Block domains used for tracking at an OS level",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.domains[*] in $<LIST_UUID>)",

    "identity": ""

  }'


```

To get the UUIDs of your lists, use the [List Zero Trust lists](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/list/) endpoint.

## Block malicious IPs

Block specific IP addresses that are known to be malicious or pose a threat to your organization. This policy is usually implemented by creating custom blocklists or by using blocklists provided by threat intelligence partners or regional Computer Emergency and Response Teams (CERTs).

* [ Dashboard ](#tab-panel-7577)
* [ API ](#tab-panel-7578)

| Selector    | Operator | Value     | Action |
| ----------- | -------- | --------- | ------ |
| Resolved IP | in list  | _DShield_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block malicious IPs",

    "description": "Block specific IP addresses that are known to be malicious or pose a threat to your organization",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.resolved_ips[*] in $<LIST_UUID>)",

    "identity": ""

  }'


```

To get the UUIDs of your lists, use the [List Zero Trust lists](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/list/) endpoint.

## Turn on CIPA filter

The CIPA (Children's Internet Protection Act) Filter is a collection of subcategories that encompass a wide range of topics that could be harmful or inappropriate for minors. It is used as a part of [Project Cybersafe Schools](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cybersafe/) to block access to unwanted or harmful online content. Upon creating this policy, your organization will have minimum [CIPA compliance ↗](https://www.fcc.gov/consumers/guides/childrens-internet-protection-act).

* [ Dashboard ](#tab-panel-7575)
* [ API ](#tab-panel-7576)

| Selector           | Operator | Value         | Action |
| ------------------ | -------- | ------------- | ------ |
| Content Categories | in       | _CIPA Filter_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Turn on CIPA filter",

    "description": "Block access to unwanted or harmful online content for children",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.content_category[*] in {182})",

    "identity": ""

  }'


```

## Hide explicit search results

SafeSearch is a feature of search engines that helps you filter explicit or offensive content. You can force SafeSearch on search engines like Google, Bing, Yandex, YouTube, and DuckDuckGo:

* [ Dashboard ](#tab-panel-7579)
* [ API ](#tab-panel-7580)

| Selector           | Operator | Value            | Action      |
| ------------------ | -------- | ---------------- | ----------- |
| Content Categories | in       | _Search Engines_ | Safe Search |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Hide explicit search results",

    "description": "Force SafeSearch on search engines to filter explicit or offensive content",

    "enabled": true,

    "action": "safesearch",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.content_category[*] in {145})",

    "identity": ""

  }'


```

## Check user identity

Configure access on a per user or group basis by adding [identity-based conditions](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) to your policies.

* [ Dashboard ](#tab-panel-7581)
* [ API ](#tab-panel-7582)

| Selector         | Operator | Value        | Logic | Action |
| ---------------- | -------- | ------------ | ----- | ------ |
| Application      | in       | _Salesforce_ | And   | Block  |
| User Group Names | in       | Contractors  |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Check user identity",

    "description": "Filter traffic based on a user identity group name",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(app.ids[*] in {606})",

    "identity": "any(identity.groups.name[*] in {\"Contractors\"})"

  }'


```

## Restrict access to specific groups

Filter DNS queries to allow only specific users access.

The following example includes two policies. The first policy allows the specified group, while the second policy blocks all other users. To ensure the policies are evaluated properly, place the Allow policy above the Block policy. For more information, refer to the [order of precedence](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence).

### 1\. Allow a group

* [ Dashboard ](#tab-panel-7583)
* [ API ](#tab-panel-7584)

| Selector           | Operator | Value             | Logic | Action |
| ------------------ | -------- | ----------------- | ----- | ------ |
| Content Categories | in       | _Social Networks_ | And   | Allow  |
| User Group Names   | in       | Marketing         |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow social media for Marketing",

    "description": "Allow access to social media sites for users in the Marketing group",

    "precedence": 1,

    "enabled": true,

    "action": "allow",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.content_category[*] in {149})",

    "identity": "any(identity.groups.name[*] in {\"Marketing\"})"

  }'


```

### 2\. Block all other users

* [ Dashboard ](#tab-panel-7585)
* [ API ](#tab-panel-7586)

| Selector           | Operator | Value             | Action |
| ------------------ | -------- | ----------------- | ------ |
| Content Categories | in       | _Social Networks_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block social media",

    "description": "Block social media for all other users",

    "precedence": 2,

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.content_category[*] in {149})",

    "identity": ""

  }'


```

## Control IP version

Enterprise users can pair these policies with an [egress policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/) to control which IP version is used when Gateway connects to the destination server.

Optionally, you can use the Domain selector to control the IP version for specific sites.

Note

To ensure traffic routes through your preferred IP version, turn off **Modify Gateway block behavior**.

### Force IPv4

Force users to connect with IPv4 by blocking `AAAA` (IPv6) record resolution.

* [ Dashboard ](#tab-panel-7587)
* [ API ](#tab-panel-7588)

| Selector          | Operator | Value  | Action |
| ----------------- | -------- | ------ | ------ |
| Query Record Type | is       | _AAAA_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Force IPv4",

    "description": "Force users to connect with IPv4 by blocking IPv6 resolution",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "dns.query_rtype == \"AAAA\"",

    "identity": ""

  }'


```

### Force IPv6

Force users to connect with IPv6 by blocking `A` (IPv4) record resolution.

* [ Dashboard ](#tab-panel-7589)
* [ API ](#tab-panel-7590)

| Selector          | Operator | Value | Action |
| ----------------- | -------- | ----- | ------ |
| Query Record Type | is       | _A_   | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Force IPv6",

    "description": "Force users to connect with IPv6 by blocking IPv4 resolution",

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "dns.query_rtype == \"A\"",

    "identity": ""

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/common-policies/#page","headline":"Common DNS policies · Cloudflare One docs","description":"Reference information for Common policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/common-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS","REST API","IPv4","IPv6"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/dns-policies/","name":"DNS policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/dns-policies/common-policies/","name":"Common policies"}}]}
```
