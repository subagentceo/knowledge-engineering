---
title: Recommended network policies
description: Deploy recommended network security policies.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Recommended network policies

We recommend you add the following network policies to build an Internet and SaaS app security strategy for your organization.

For additional commonly used network policy examples, refer to [Common network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/common-policies/). For more information on building network policies, refer to [Network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/).

## Quarantined-Users-NET-Restricted-Access

Restrict access for users included in an identity provider (IdP) user group for risky users. This policy ensures your security team can restrict traffic for users of whom malicious or suspicious activity was detected.

* [ Dashboard ](#tab-panel-9242)
* [ API ](#tab-panel-9243)
* [ Terraform ](#tab-panel-9244)

| Selector         | Operator    | Value                               | Logic | Action |
| ---------------- | ----------- | ----------------------------------- | ----- | ------ |
| Destination IP   | not in list | _Quarantined-Users-IPAllowlist_     | Or    | Block  |
| SNI              | not in list | _Quarantined-Users-HostAllowlist_   | Or    |        |
| SNI Domain       | not in list | _Quarantined-Users-DomainAllowlist_ | And   |        |
| User Group Names | in          | _Quarantined Users_                 |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Quarantined-Users-NET-Restricted-Access",

    "description": "Restrict access for users included in an IdP user group for risky users",

    "precedence": 0,

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "not(net.dst.ip in $<IP_ALLOWLIST_UUID>) or not(net.sni.host in $<HOST_ALLOWLIST_UUID>) or not(any(net.sni.domains[] in $<DOMAIN_ALLOWLIST_UUID>))",

    "identity": "any(identity.groups.name[] in {\"Quarantined Users\"})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "quarantined_users_net_restricted_access" {

  account_id  = var.cloudflare_account_id

  name        = "Quarantined-Users-NET-Restricted-Access"

  description = "Restrict access for users included in an IdP user group for risky users"

  precedence  = 0

  enabled     = true

  action      = "block"

  filters     = ["l4"]

  traffic     = "not(net.dst.ip in ${"$"}${cloudflare_zero_trust_list.ip_allowlist.id}) or not(net.sni.host in ${"$"}${cloudflare_zero_trust_list.host_allowlist.id}) or not(any(net.sni.domains[*] in ${"$"}${cloudflare_zero_trust_list.domain_allowlist.id}))"

  identity    = "any(identity.groups.name[*] in {\"Quarantined Users\"})"

}


```

## Posture-Fail-NET-Restricted-Access

Restrict access for devices where baseline posture checks have not passed. If posture checks are integrated with service providers such as Crowdstrike or Intune via the API, this policy dynamically blocks access for devices that do not meet predetermined security requirements.

Restrict access for users included in an identity provider (IdP) user group for risky users. This policy ensures your security team can restrict traffic for users of whom malicious or suspicious activity was detected.

* [ Dashboard ](#tab-panel-9245)
* [ API ](#tab-panel-9246)
* [ Terraform ](#tab-panel-9247)

| Selector                     | Operator    | Value                               | Logic | Action |
| ---------------------------- | ----------- | ----------------------------------- | ----- | ------ |
| Destination IP               | not in list | _Posture-Fail-IPAllowlist_          | Or    | Block  |
| SNI                          | not in list | _Posture-Fail-HostAllowlist_        | Or    |        |
| SNI Domain                   | not in list | _Posture-Fail-DomainAllowlist_      | And   |        |
| Passed Device Posture Checks | not in      | _Windows 10 or higher (OS version)_ |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Posture-Fail-NET-Restricted-Access",

    "description": "Restrict access for devices where baseline posture checks have not passed",

    "precedence": 10,

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "not(net.dst.ip in $<IP_ALLOWLIST_UUID>) or not(net.sni.host in $<HOST_ALLOWLIST_UUID>) or not(any(net.sni.domains[] in $<DOMAIN_ALLOWLIST_UUID>))",

    "device_posture": "not(any(device_posture.checks.passed[] in {\"<DEVICE_POSTURE_CHECK_UUID>\"}))"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "posture_fail_net_restricted_access" {

  account_id  = var.cloudflare_account_id

  name        = "Posture-Fail-NET-Restricted-Access"

  description = "Restrict access for devices where baseline posture checks have not passed"

  precedence  = 10

  enabled     = true

  action      = "block"

  filters     = ["l4"]

  traffic     = "not(net.dst.ip in ${"$"}${cloudflare_zero_trust_list.ip_allowlist.id}) or not(net.sni.host in ${"$"}${cloudflare_zero_trust_list.host_allowlist.id}) or not(any(net.sni.domains[*] in ${"$"}${cloudflare_zero_trust_list.domain_allowlist.id}))"

  device_posture = "not(any(device_posture.checks.passed[*] in {\"${cloudflare_device_posture_rule.baseline_check.id}\"}))"

}


```

You can add a number of Cloudflare One Client device posture checks as needed, such as [Disk encryption](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/disk-encryption/) and [Domain joined](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/domain-joined/). For more information on device posture checks, refer to [Enforce device posture](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

## FinanceUsers-NET-HTTPS-FinanceServers (example)

Allow HTTPS access for user groups. For example, the following policy gives finance users access to any known financial applications:

* [ Dashboard ](#tab-panel-9248)
* [ API ](#tab-panel-9249)
* [ Terraform ](#tab-panel-9250)

| Selector         | Operator | Value             | Logic | Action |
| ---------------- | -------- | ----------------- | ----- | ------ |
| Destination IP   | in list  | _Finance Servers_ | And   | Allow  |
| User Group Names | in       | _Finance Users_   |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "FinanceUsers-NET-HTTPS-FinanceServers",

    "description": "Allow HTTPS access for user groups",

    "precedence": 20,

    "enabled": true,

    "action": "allow",

    "filters": [

        "l4"

    ],

    "traffic": "net.dst.ip in $<FINANCE_SERVERS_LIST_UUID>",

    "identity": "any(identity.groups.name[*] in {\"Finance Users\"})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "finance_users_net_https_finance_servers" {

  account_id  = var.cloudflare_account_id

  name        = "FinanceUsers-NET-HTTPS-FinanceServers"

  description = "Allow HTTPS access for user groups"

  precedence  = 20

  enabled     = true

  action      = "allow"

  filters     = ["l4"]

  traffic     = "net.dst.ip in ${"$"}${cloudflare_zero_trust_list.finance_servers_list.id}"

  identity    = "any(identity.groups.name[*] in {\"Finance Users\"})"

}


```

## All-NET-Internet-Blocklist

Block traffic to destination IPs, SNIs, and SNI domains that are malicious or pose a threat to your organization.

You can implement this policy by either creating custom blocklists or by using blocklists provided by threat intelligence partners or regional Computer Emergency and Response Teams (CERTs). Ideally, your CERTs can update the blocklist with an [API automation](https://developers.cloudflare.com/security-center/intel-apis/) to provide real-time threat protection.

* [ Dashboard ](#tab-panel-9251)
* [ API ](#tab-panel-9252)
* [ Terraform ](#tab-panel-9253)

| Selector       | Operator | Value              | Logic | Action |
| -------------- | -------- | ------------------ | ----- | ------ |
| Destination IP | in list  | _IP Blocklist_     | Or    | Block  |
| SNI            | in list  | _Host Blocklist_   | Or    |        |
| SNI Domain     | in list  | _Domain Blocklist_ |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-NET-Internet-Blocklist",

    "description": "Block traffic to malicious or risky destination IPs, SNIs, and SNI domains",

    "precedence": 30,

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "net.dst.ip in $<IP_BLOCKLIST_UUID> and net.sni.host in $<HOST_BLOCKLIST_UUID> and any(net.sni.domains[*] in $<DOMAIN_BLOCKLIST_UUID>)"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "finance_users_net_https_finance_servers" {

  account_id  = var.cloudflare_account_id

  name        = "All-NET-Internet-Blocklist"

  description = "Block traffic to malicious or risky destination IPs, SNIs, and SNI domains"

  precedence  = 30

  enabled     = true

  action      = "block"

  filters     = ["l4"]

  traffic     = "net.dst.ip in ${"$"}${cloudflare_zero_trust_list.ip_blocklist.id} and net.sni.host in ${"$"}${cloudflare_zero_trust_list.host_blocklist.id} and any(net.sni.domains[*] in ${"$"}${cloudflare_zero_trust_list.domain_blocklist.id})"

}


```

Note

The **Detected Protocol** selector is only available for Enterprise users. For more information, refer to [Protocol detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/).

## All-NET-SSH-Internet-Allowlist

Allow SSH traffic to specific endpoints on the Internet for specific users. You can create a similar policy for other non-web endpoints that required access.

Optionally, you can include a selector to filter by source IP or IdP group.

* [ Dashboard ](#tab-panel-9254)
* [ API ](#tab-panel-9255)
* [ Terraform ](#tab-panel-9256)

| Selector          | Operator | Value               | Logic | Action |
| ----------------- | -------- | ------------------- | ----- | ------ |
| Destination IP    | in list  | _SSHAllowList_      | Or    | Allow  |
| SNI               | in list  | _SSHAllowlistFQDN_  | And   |        |
| Detected Protocol | is       | _SSH_               | And   |        |
| User Group Names  | in       | _SSH-Allowed-Users_ |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-NET-SSH-Internet-Allowlist",

    "description": "Allow SSH traffic to specific endpoints on the Internet for specific users",

    "precedence": 40,

    "enabled": true,

    "action": "allow",

    "filters": [

        "l4"

    ],

    "traffic": "net.dst.ip in $<SSH_IP_ALLOWLIST_UUID> and net.sni.host in $<SSH_FQDN_ALLOWLIST_UUID> and net.detected_protocol == \"ssh\"",

    "identity": "any(identity.groups.name[*] in {\"SSH-Allowed-Users\"})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "all_net_ssh_internet_allowlist" {

  account_id  = var.cloudflare_account_id

  name        = "All-NET-SSH-Internet-Allowlist"

  description = "Allow SSH traffic to specific endpoints on the Internet for specific users"

  precedence  = 40

  enabled     = true

  action      = "allow"

  filters     = ["l4"]

  traffic     = "net.dst.ip in ${"$"}${cloudflare_zero_trust_list.ssh_ip_allowlist.id} and net.sni.host in ${"$"}${cloudflare_zero_trust_list.ssh_fqdn_allowlist.id} and net.detected_protocol == \"ssh\""

  identity    = "any(identity.groups.name[*] in {\"SSH-Allowed-Users\"})"

}


```

## All-NET-NO-HTTP-HTTPS-Internet-Deny

Block all non-web traffic towards the Internet. By using the **Detected Protocol** selector, you will ensure alternative ports for HTTP and HTTPS are allowed.

* [ Dashboard ](#tab-panel-9257)
* [ API ](#tab-panel-9258)
* [ Terraform ](#tab-panel-9259)

| Selector          | Operator    | Value             | Logic | Action |
| ----------------- | ----------- | ----------------- | ----- | ------ |
| Destination IP    | not in list | _InternalNetwork_ | And   | Block  |
| Detected Protocol | not in      | _HTTP_, _HTTP2_   |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-NET-NO-HTTP-HTTPS-Internet-Deny",

    "description": "Block all non-web traffic towards the Internet",

    "precedence": 50,

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "not(net.dst.ip in $<INTERNAL_NETWORK_IP_LIST_UUID>) and not(net.detected_protocol in {\"http\" \"http2\"})"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "all_net_no_http_https_internet_deny" {

  account_id  = var.cloudflare_account_id

  name        = "All-NET-NO-HTTP-HTTPS-Internet-Deny"

  description = "Block all non-web traffic towards the Internet"

  precedence  = 50

  enabled     = true

  action      = "block"

  filters     = ["l4"]

  traffic     = "not(net.dst.ip in ${"$"}${cloudflare_zero_trust_list.internal_network_ip_list.id}) and not(net.detected_protocol in {\"http\" \"http2\"})"

}


```

## All-NET-InternalNetwork-ImplicitDeny

Implicitly deny all of your internal IP ranges included in a list. We recommend you place this policy at the [bottom of your policy list](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#order-of-precedence) to ensure you explicitly approve traffic defined in the above policies.

* [ Dashboard ](#tab-panel-9260)
* [ API ](#tab-panel-9261)
* [ Terraform ](#tab-panel-9262)

| Selector       | Operator | Value                  | Action |
| -------------- | -------- | ---------------------- | ------ |
| Destination IP | in list  | _Internal Network IPs_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-NET-InternalNetwork-ImplicitDeny",

    "description": "Implicitly deny all of your internal IP ranges included in a list",

    "precedence": 60,

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "net.dst.ip in $<INTERNAL_NETWORK_IP_LIST_UUID>"

  }'


```

```

resource "cloudflare_zero_trust_gateway_policy" "all_net_internalnetwork_implicitdeny" {

  account_id  = var.cloudflare_account_id

  name        = "All-NET-InternalNetwork-ImplicitDeny"

  description = "Implicitly deny all of your internal IP ranges included in a list"

  precedence  = 60

  enabled     = true

  action      = "block"

  filters     = ["l4"]

  traffic     = "net.dst.ip in ${"$"}${cloudflare_zero_trust_list.internal_network_ip_list.id}"

}


```

## All-NET-ApplicationAccess-Allow

Only allow network traffic from known and approved devices.

In the following example, you can use a list of [device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/) to ensure users can only access an application if they connect with the Cloudflare One Client from a company device:

* [ Dashboard ](#tab-panel-9263)
* [ API ](#tab-panel-9264)
* [ Terraform ](#tab-panel-9265)

| Selector                     | Operator | Value                   | Logic | Action |
| ---------------------------- | -------- | ----------------------- | ----- | ------ |
| SNI Domain                   | is       | internalapp.com         | And   | Block  |
| Passed Device Posture Checks | not in   | _Device serial numbers_ |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-NET-ApplicationAccess-Allow",

    "description": "Ensure access to the application comes from authorized WARP clients",

    "precedence": 70,

    "enabled": false,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "any(net.sni.domains[*] == \"internalapp.com\")",

    "device_posture": "not(any(device_posture.checks.passed[*] in {\"<DEVICE_SERIAL_NUMBERS_LIST_UUID>\"}))"

  }'


```

To get the UUIDs of your device posture checks, use the [List device posture rules](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/devices/subresources/posture/methods/list/) endpoint.

```

resource "cloudflare_zero_trust_gateway_policy" "all_net_applicationaccess_allow" {

  account_id  = var.cloudflare_account_id

  name        = "All-NET-ApplicationAccess-Allow"

  description = "Ensure access to the application comes from authorized WARP clients"

  precedence  = 70

  enabled     = false

  action      = "block"

  filters     = ["l4"]

  traffic     = "any(net.sni.domains[*] == \"internalapp.com\")"

  posture      =  "not(any(device_posture.checks.passed[*] in {\"${"$"}${cloudflare_zero_trust_list.allowed_devices_sn_list.id}\"}))"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/recommended-network-policies/#page","headline":"Recommended network policies · Cloudflare Learning Paths","description":"Deploy recommended network security policies.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/recommended-network-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-network-policies/","name":"Build network security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-network-policies/recommended-network-policies/","name":"Recommended network policies"}}]}
```
