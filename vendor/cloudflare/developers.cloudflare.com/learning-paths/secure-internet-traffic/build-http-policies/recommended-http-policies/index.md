---
title: Recommended HTTP policies
description: Deploy recommended HTTP security policies.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Recommended HTTP policies

We recommend you add the following HTTP policies to build an Internet and SaaS app security strategy for your organization.

For additional commonly used HTTP policy examples, refer to [Common HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/common-policies/). For more information on building HTTP policies, refer to [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/).

## All-HTTP-Application-InspectBypass

Bypass HTTP inspection for applications that use embedded certificates. This will help avoid any certificate pinning errors that may arise from an initial rollout.

* [ Dashboard ](#tab-panel-9204)
* [ API ](#tab-panel-9205)
* [ Terraform ](#tab-panel-9206)

| Selector    | Operator | Value            | Action         |
| ----------- | -------- | ---------------- | -------------- |
| Application | in       | _Do Not Inspect_ | Do Not Inspect |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-HTTP-Application-InspectBypass",

    "description": "Bypass HTTP inspection for applications that use embedded certificates",

    "precedence": 0,

    "enabled": true,

    "action": "block",

    "filters": [

        "http"

    ],

    "traffic": "any(app.type.ids[*] in {16})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "all_http_application_inspect_bypass" {

  account_id  = var.cloudflare_account_id

  name        = "All-HTTP-Application-InspectBypass"

  description = "Bypass HTTP inspection for applications that use embedded certificates"

  precedence  = 0

  enabled     = true

  action      = "block"

  filters     = ["http"]

  traffic     = "any(app.type.ids[*] in {16})"

}


```

## Android-HTTP-Application-InspectionBypass

Bypass HTTPS inspection for Android applications (such as Google Drive) that use certificate pinning, which is incompatible with Gateway inspection.

* [ Dashboard ](#tab-panel-9207)
* [ API ](#tab-panel-9208)
* [ Terraform ](#tab-panel-9209)

| Selector                     | Operator | Value                             | Logic | Action         |
| ---------------------------- | -------- | --------------------------------- | ----- | -------------- |
| Application                  | in       | _Google Drive_                    | And   | Do Not Inspect |
| Passed Device Posture Checks | in       | _OS Version Android (OS version)_ |       |                |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Android-HTTP-Application-InspectionBypass",

    "description": "Bypass HTTPS inspection for Android applications with certificate pinning",

    "precedence": 10,

    "enabled": true,

    "action": "off",

    "filters": [

        "http"

    ],

    "traffic": "any(app.ids[] in {554})",

    "device_posture": "any(device_posture.checks.passed[] in {\"<ANDROID_VERSION_POSTURE_CHECK_UUID >\"})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "android_http_application_inspection_bypass" {

  account_id  = var.cloudflare_account_id

  name        = "Android-HTTP-Application-InspectionBypass"

  description = "Bypass HTTPS inspection for Android applications with certificate pinning"

  precedence  = 10

  enabled     = true

  action      = "off"

  filters     = ["http"]

  traffic     = "any(app.ids[*] in {554})"

  device_posture = "any(device_posture.checks.passed[*] in {\"${"$"}{cloudflare_zero_trust_list.android_version_posture_check.id}\"})"

}


```

## All-HTTP-Domain-Inspection-Bypass

Bypass HTTP inspection for a custom list of domains identified as incompatible with TLS inspection.

* [ Dashboard ](#tab-panel-9210)
* [ API ](#tab-panel-9211)
* [ Terraform ](#tab-panel-9212)

| Selector | Operator | Value                    | Logic | Action         |
| -------- | -------- | ------------------------ | ----- | -------------- |
| Domain   | in list  | _DomainInspectionBypass_ | Or    | Do Not Inspect |
| Domain   | in list  | _Known Domains_          |       |                |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-HTTP-Domain-Inspection-Bypass",

    "description": "Bypass HTTP inspection for a custom list of domains identified as incompatible with TLS inspection",

    "precedence": 20,

    "enabled": true,

    "action": "off",

    "filters": [

        "http"

    ],

    "traffic": "any(http.request.domains[*] in $<DOMAIN_INSPECTION_BYPASS_LIST_UUID>) or any(http.request.domains[*] in $<KNOWN_DOMAINS_LIST_UUID>)"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "android_http_application_inspection_bypass" {

  account_id  = var.cloudflare_account_id

  name        = "All-HTTP-Domain-Inspection-Bypass"

  description = "Bypass HTTP inspection for a custom list of domains identified as incompatible with TLS inspection"

  precedence  = 20

  enabled     = true

  action      = "off"

  filters     = ["http"]

  traffic     = "any(http.request.domains[*] in ${"$"}{cloudflare_zero_trust_list.domain_inspection_bypass_list.id}) or any(http.request.domains[*] in ${"$"}{cloudflare_zero_trust_list.known_domains_list.id})"

}


```

## All-HTTP-SecurityRisks-Blocklist

Block [security categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories), such as **Command and Control & Botnet** and **Malware**, based on Cloudflare's threat intelligence.

* [ Dashboard ](#tab-panel-9213)
* [ API ](#tab-panel-9214)
* [ Terraform ](#tab-panel-9215)

| Selector            | Operator | Value                | Action |
| ------------------- | -------- | -------------------- | ------ |
| Security Categories | in       | _All security risks_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-HTTP-SecurityRisks-Blocklist",

    "description": "Block security categories based on Cloudflare'\''s threat intelligence",

    "precedence": 30,

    "enabled": true,

    "action": "block",

    "filters": [

        "http"

    ],

    "traffic": "any(http.request.uri.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "all_http_security_risks_blocklist" {

  account_id  = var.cloudflare_account_id

  name        = "All-HTTP-SecurityRisks-Blocklist"

  description = "Block security categories based on Cloudflare's threat intelligence"

  precedence  = 30

  enabled     = true

  action      = "block"

  filters     = ["http"]

  traffic     = "any(http.request.uri.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})"

}


```

## All-HTTP-ContentCategories-Blocklist

Entries in the [security risk content subcategory](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-risk-subcategories), such as **New Domains**, do not always pose a security threat. We recommend you first create an Allow policy to track policy matching and identify any false positives. You can add false positives to your **Trusted Domains** list used in **All-HTTP-Domain-Allowlist**.

After your test is complete, we recommend you change the action to Block to minimize risk to your organization.

* [ Dashboard ](#tab-panel-9228)
* [ API ](#tab-panel-9229)
* [ Terraform ](#tab-panel-9230)

| Selector           | Operator | Value                                                                                 | Action |
| ------------------ | -------- | ------------------------------------------------------------------------------------- | ------ |
| Content Categories | in       | _Questionable Content_, _Security Risks_, _Miscellaneous_, _Adult Themes_, _Gambling_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-HTTP-ContentCategories-Blocklist",

    "description": "Block access to questionable content and potential security risks",

    "precedence": 40,

    "enabled": true,

    "action": "block",

    "filters": [

        "http"

    ],

    "traffic": "any(http.request.uri.content_category[*] in {17 85 87 102 157 135 138 180 162 32 169 177 128 15 115 119 124 141 161 2 67 125 133 99})",

    "identity": "",

    "device_posture": ""

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "block_unauthorized_apps" {

  account_id     = var.cloudflare_account_id

  name           = "All-HTTP-ContentCategories-Blocklist"

  description    = "Block access to questionable content and potential security risks"

  precedence     = 40

  enabled        = true

  action         = "block"

  filters        = ["http"]

  traffic        = "any(http.request.uri.content_category[*] in {17 85 87 102 157 135 138 180 162 32 169 177 128 15 115 119 124 141 161 2 67 125 133 99})"

  identity       = ""

  device_posture = ""

}


```

## All-HTTP-DomainHost-Blocklist

Block specific domains or hosts that are malicious or pose a threat to your organization. Like **All-HTTP-ResolvedIP-Blocklist**, this blocklist can be updated manually or via API automation.

* [ Dashboard ](#tab-panel-9216)
* [ API ](#tab-panel-9217)
* [ Terraform ](#tab-panel-9218)

| Selector | Operator      | Value              | Logic | Action |
| -------- | ------------- | ------------------ | ----- | ------ |
| Domain   | in list       | _Domain Blocklist_ | Or    | Block  |
| Host     | in list       | _Host Blocklist_   | Or    |        |
| Host     | matches regex | .\*example\\.com   |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-HTTP-DomainHost-Blocklist",

    "description": "Block specific domains or hosts that are malicious or pose a threat to your organization",

    "precedence": 50,

    "enabled": true,

    "action": "block",

    "filters": [

        "http"

    ],

    "traffic": "any(http.request.domains[*] in $<DOMAIN_BLOCKLIST_UUID>) or http.request.host in $<HOST_BLOCKLIST_UUID> or http.request.host matches \".*example.com\""

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "all_http_domainhost_blocklist" {

  account_id  = var.cloudflare_account_id

  name        = "All-HTTP-DomainHost-Blocklist"

  description = "Block specific domains or hosts that are malicious or pose a threat to your organization"

  precedence  = 50

  enabled     = true

  action      = "block"

  filters     = ["http"]

  traffic     = "any(http.request.domains[*] in ${"$"}{cloudflare_zero_trust_list.domain_blocklist.id}) or http.request.host in ${"$"}{cloudflare_zero_trust_list.host_blocklist.id} or http.request.host matches \".*example\\.com\""

}


```

## All-HTTP-Application-Blocklist

Block unauthorized applications to limit your users' access to certain web-based tools and minimize the risk of [shadow IT](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/). For example, the following policy blocks known AI tools:

* [ Dashboard ](#tab-panel-9231)
* [ API ](#tab-panel-9232)
* [ Terraform ](#tab-panel-9233)

| Selector    | Operator | Value                     | Action |
| ----------- | -------- | ------------------------- | ------ |
| Application | in       | _Artificial Intelligence_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-HTTP-Application-Blocklist",

    "description": "Limit access to shadow IT by blocking web-based tools and applications",

    "precedence": 60,

    "enabled": true,

    "action": "block",

    "filters": [

        "http"

    ],

    "traffic": "any(app.type.ids[*] in {25})",

    "identity": "",

    "device_posture": ""

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "all_http_application_blocklist" {

  account_id     = var.cloudflare_account_id

  name           = "All-HTTP-Application-Blocklist"

  description    = "Limit access to shadow IT by blocking web-based tools and applications"

  precedence     = 60

  enabled        = true

  action         = "block"

  filters        = ["http"]

  traffic        = "any(app.type.ids[*] in {25})"

  identity       = ""

  device_posture = ""

}


```

## PrivilegedUsers-HTTP-Any-Isolate

Isolate traffic for privileged users who regularly access critical systems or execute actions such as threat analysis and malware testing.

Security teams often need to perform threat analysis or malware testing that could trigger malware detection. Likewise, privileged users could be the target of attackers trying to gain access to critical systems.

* [ Dashboard ](#tab-panel-9219)
* [ API ](#tab-panel-9220)
* [ Terraform ](#tab-panel-9221)

| Selector         | Operator | Value              | Action  |
| ---------------- | -------- | ------------------ | ------- |
| User Group Names | in       | _Privileged Users_ | Isolate |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "PrivilegedUsers-HTTP-Any-Isolate",

    "description": "Isolate traffic for privileged users who regularly access critical or testing systems",

    "precedence": 70,

    "enabled": true,

    "action": "isolate",

    "filters": [

        "http"

    ],

    "identity": "any(identity.groups.name[*] in {\"Privileged Users\"})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "privileged_users_http_any_isolate" {

  account_id  = var.cloudflare_account_id

  name        = "PrivilegedUsers-HTTP-Any-Isolate"

  description = "Isolate traffic for privileged users who regularly access critical or testing systems"

  precedence  = 70

  enabled     = true

  action      = "isolate"

  filters     = ["http"]

  identity    = "any(identity.groups.name[*] in {\"Privileged Users\"})"

}


```

## Quarantined-Users-HTTP-Restricted-Access

Restrict access for users included in an identity provider (IdP) user group for risky users. This policy ensures your security team can restrict traffic for users of whom malicious or suspicious activity was detected.

* [ Dashboard ](#tab-panel-9222)
* [ API ](#tab-panel-9223)
* [ Terraform ](#tab-panel-9224)

| Selector         | Operator    | Value                           | Logic | Action |
| ---------------- | ----------- | ------------------------------- | ----- | ------ |
| Destination IP   | not in list | _Quarantined-Users-IPAllowlist_ | And   | Block  |
| User Group Names | in          | _Quarantined Users_             |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Quarantined-Users-HTTP-Restricted-Access",

    "description": "Restrict access for users included in an identity provider (IdP) user group for risky users",

    "precedence": 80,

    "enabled": true,

    "action": "block",

    "filters": [

        "http"

    ],

    "traffic": "not(any(http.conn.dst_ip[] in $<QUARANTINED_USERS_IP_ALLOWLIST_UUID>))",

    "identity": "any(identity.groups.name[] in {\"Quarantined Users\"})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "quarantined_users_http_restricted_access" {

  account_id  = var.cloudflare_account_id

  name        = "Quarantined-Users-HTTP-Restricted-Access"

  description = "Restrict access for users included in an identity provider (IdP) user group for risky users"

  precedence  = 80

  enabled     = true

  action      = "block"

  filters     = ["http"]

  traffic     = "not(any(http.conn.dst_ip[*] in ${"$"}{cloudflare_zero_trust_list.quarantined_users_ip_allowlist.id}))"

  identity    = "any(identity.groups.name[*] in {\"Quarantined Users\"})"

}


```

## All-HTTP-Domain-Isolate

Isolate high risk domains or create a custom list of known risky domains to avoid data exfiltration or malware infection. Ideally, your incident response teams can update the blocklist with an [API automation](https://developers.cloudflare.com/security-center/intel-apis/) to provide real-time threat protection.

* [ Dashboard ](#tab-panel-9225)
* [ API ](#tab-panel-9226)
* [ Terraform ](#tab-panel-9227)

| Selector           | Operator | Value                               | Logic | Action  |
| ------------------ | -------- | ----------------------------------- | ----- | ------- |
| Content Categories | in       | _New Domains_, _Newly Seen Domains_ | Or    | Isolate |
| Domain             | in list  | _Domain Isolation_                  |       |         |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-HTTP-Domain-Isolate",

    "description": "Isolate high risk domains or create a custom list of known risky domains to avoid data exfiltration or malware infection",

    "precedence": 90,

    "enabled": true,

    "action": "isolate",

    "filters": [

        "http"

    ],

    "traffic": "any(http.request.uri.content_category[*] in {169 177}) or any(http.request.domains[*] in $<DOMAIN_ISOLATE_LIST_UUID>)"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "all_http_domain_isolate" {

  account_id  = var.cloudflare_account_id

  name        = "All-HTTP-Domain-Isolate"

  description = "Isolate high risk domains or create a custom list of known risky domains to avoid data exfiltration or malware infection"

  precedence  = 90

  enabled     = true

  action      = "isolate"

  filters     = ["http"]

  traffic     = "any(http.request.uri.content_category[*] in {169 177}) or any(http.request.domains[*] in ${"$"}{cloudflare_zero_trust_list.domain_isolate_list.id})"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/recommended-http-policies/#page","headline":"Recommended HTTP policies · Cloudflare Learning Paths","description":"Deploy recommended HTTP security policies.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/recommended-http-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/","name":"Build HTTP security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/recommended-http-policies/","name":"Recommended HTTP policies"}}]}
```
