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

The following policies are commonly used to secure network traffic. Network policies are evaluated in order from top to bottom, and the first matching policy applies. Place more specific Allow policies above broader Block policies.

For a baseline set of recommended policies, refer to [Secure your Internet traffic and SaaS apps](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/recommended-network-policies/).

Refer to the [network policies page](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) for a comprehensive list of other selectors, operators, and actions.

## Block unauthorized applications

Note

After seven days, view your [Shadow IT SaaS Analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/) and block additional applications based on what your users are accessing.

To minimize the risk of [shadow IT](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/), some organizations choose to limit their users' access to certain web-based tools and applications. For example, the following policy blocks known AI tools:

* [ Dashboard ](#tab-panel-7661)
* [ API ](#tab-panel-7662)

| Selector    | Operator | Value                     | Action |
| ----------- | -------- | ------------------------- | ------ |
| Application | in       | _Artificial Intelligence_ | Block  |

In the following API examples, `filters: ["l4"]` indicates that this is a network (Layer 4) policy.

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block unauthorized applications",

    "description": "Block access to unauthorized AI applications",

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "any(app.type.ids[*] in {25})",

    "identity": "",

    "device_posture": ""

  }'


```

## Check user identity

Configure access on a per user or group basis by adding [identity-based conditions](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) to your policies.

* [ Dashboard ](#tab-panel-7659)
* [ API ](#tab-panel-7660)

| Selector         | Operator | Value         | Logic | Action |
| ---------------- | -------- | ------------- | ----- | ------ |
| Application      | in       | _Salesforce_  | And   | Block  |
| User Group Names | in       | _Contractors_ |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Check user identity",

    "description": "Block access to Salesforce by temporary employees and contractors",

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "any(app.ids[*] in {606})",

    "identity": "any(identity.groups.name[*] in {\"Contractors\"})",

    "device_posture": ""

  }'


```

## Enforce device posture

Require devices to have certain software installed or other configuration attributes. For instructions on enabling a device posture check, refer to the [device posture section](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/). For example, you can use a list of [device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/) to ensure users can only access an application if they connect with the Cloudflare One Client from a company device:

In the following example, you can use a list of [device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/) to ensure users can only access an application if they connect with the Cloudflare One Client from a company device:

* [ Dashboard ](#tab-panel-7683)
* [ API ](#tab-panel-7684)
* [ Terraform ](#tab-panel-7685)

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

## Enforce session duration

To require users to re-authenticate after a certain amount of time has elapsed, configure [Cloudflare One Client sessions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).

## Allow only approved traffic

Restrict user access to only the specific sites or applications configured in your [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/). This pattern uses two policies: an Allow policy to permit HTTP/HTTPS traffic, followed by a Block policy to deny everything else. Place the Allow policy above the Block policy so that matching traffic is allowed before the catch-all block applies.

### 1\. Allow HTTP and HTTPS traffic

* [ Dashboard ](#tab-panel-7663)
* [ API ](#tab-panel-7664)

| Selector          | Operator | Value   | Logic | Action |
| ----------------- | -------- | ------- | ----- | ------ |
| Detected Protocol | is       | _TLS_   | And   | Allow  |
| Destination Port  | in       | 80, 443 |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow HTTP and HTTPS traffic",

    "description": "Restrict traffic to HTTP and HTTPS traffic",

    "enabled": true,

    "action": "allow",

    "filters": [

        "l4"

    ],

    "traffic": "net.detected_protocol == \"tls\" and net.dst.port in {80 443}",

    "identity": "",

    "device_posture": ""

  }'


```

### 2\. Block all other traffic

* [ Dashboard ](#tab-panel-7665)
* [ API ](#tab-panel-7666)

| Selector | Operator | Value        | Action |
| -------- | -------- | ------------ | ------ |
| Protocol | in       | _TCP_, _UDP_ | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block all other traffic",

    "description": "Block all other traffic that is not HTTP or HTTPS",

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "net.protocol in {\"tcp\" \"udp\"}",

    "identity": "",

    "device_posture": ""

  }'


```

## Filter HTTPS traffic when inspecting on all ports

If your organization blocks traffic by default with a Network policy and you want to [inspect HTTP traffic on all ports](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports), you need to explicitly allow HTTP and TLS traffic to filter it.

* [ Dashboard ](#tab-panel-7667)
* [ API ](#tab-panel-7668)

| Selector          | Operator | Value  | Logic | Action |
| ----------------- | -------- | ------ | ----- | ------ |
| Detected Protocol | is       | _TLS_  | Or    | Allow  |
| Detected Protocol | is       | _HTTP_ |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow on inspect all ports",

    "description": "Filter HTTPS traffic when using inspect all ports",

    "enabled": true,

    "action": "allow",

    "filters": [

        "l4"

    ],

    "traffic": "net.detected_protocol == \"tls\" or net.detected_protocol == \"http\"",

    "identity": "",

    "device_posture": ""

  }'


```

## Restrict private network access to proxy endpoint users

When using proxy endpoints, by default all devices added to the proxy endpoint can access your internal applications and services connected through [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/). To restrict access and add an additional layer of security, create the following policies.

### Source IP proxy endpoints

When using [source IP proxy endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#source-ip-endpoint), restrict access to only users connecting through the proxy endpoint from specific source IPs.

#### 1\. Allow proxy endpoint traffic from specific source IPs

* [ Dashboard ](#tab-panel-7669)
* [ API ](#tab-panel-7670)

| Selector       | Operator | Value            | Logic | Action |
| -------------- | -------- | ---------------- | ----- | ------ |
| Proxy Endpoint | in       | _Proxy Endpoint_ | And   | Allow  |
| Source IP      | in       | 203.0.113.0/24   | And   |        |
| Destination IP | in       | 10.0.0.0/8       |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow proxy endpoint traffic from specific source IPs",

    "description": "Allow traffic from proxy endpoint users with specific source IPs to reach private network",

    "enabled": true,

    "action": "allow",

    "filters": [

        "l4"

    ],

    "traffic": "net.proxy_endpoint.ids[*] in {\"<PROXY_ENDPOINT_ID>\"} and net.src.ip in {203.0.113.0/24} and net.dst.ip in {10.0.0.0/8}",

    "identity": "",

    "device_posture": ""

  }'


```

Replace `<PROXY_ENDPOINT_ID>` with your proxy endpoint ID.

#### 2\. Block all other proxy endpoint traffic to private network

* [ Dashboard ](#tab-panel-7671)
* [ API ](#tab-panel-7672)

| Selector       | Operator | Value            | Logic | Action |
| -------------- | -------- | ---------------- | ----- | ------ |
| Proxy Endpoint | in       | _Proxy Endpoint_ | And   | Block  |
| Destination IP | in       | 10.0.0.0/8       |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block all other proxy endpoint traffic",

    "description": "Block any other proxy endpoint traffic from accessing the private network",

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "net.proxy_endpoint.ids[*] in {\"<PROXY_ENDPOINT_ID>\"} and net.dst.ip in {10.0.0.0/8}",

    "identity": "",

    "device_posture": ""

  }'


```

Replace `<PROXY_ENDPOINT_ID>` with your proxy endpoint ID.

### Authorization proxy endpoints

When using [authorization proxy endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#authorization-endpoint), add an additional layer of security by restricting access to only users connecting from specific source IPs. This prevents unauthorized access even if user credentials are compromised.

#### 1\. Allow proxy endpoint traffic from specific source IPs

* [ Dashboard ](#tab-panel-7673)
* [ API ](#tab-panel-7674)

| Selector       | Operator | Value            | Logic | Action |
| -------------- | -------- | ---------------- | ----- | ------ |
| Proxy Endpoint | in       | _Proxy Endpoint_ | And   | Allow  |
| Source IP      | in       | 203.0.113.0/24   | And   |        |
| Destination IP | in       | 10.0.0.0/8       |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow authorized proxy endpoint traffic from specific source IPs",

    "description": "Allow traffic from authorization proxy endpoint users with specific source IPs to reach private network",

    "enabled": true,

    "action": "allow",

    "filters": [

        "l4"

    ],

    "traffic": "net.proxy_endpoint.ids[*] in {\"<PROXY_ENDPOINT_ID>\"} and net.src.ip in {203.0.113.0/24} and net.dst.ip in {10.0.0.0/8}",

    "identity": "",

    "device_posture": ""

  }'


```

Replace `<PROXY_ENDPOINT_ID>` with your proxy endpoint ID.

#### 2\. Block all other proxy endpoint traffic to private network

* [ Dashboard ](#tab-panel-7677)
* [ API ](#tab-panel-7678)

| Selector       | Operator | Value            | Logic | Action |
| -------------- | -------- | ---------------- | ----- | ------ |
| Proxy Endpoint | in       | _Proxy Endpoint_ | And   | Block  |
| Destination IP | in       | 10.0.0.0/8       |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block all other authorized proxy endpoint traffic",

    "description": "Block any other authorization proxy endpoint traffic from accessing the private network",

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "net.proxy_endpoint.ids[*] in {\"<PROXY_ENDPOINT_ID>\"} and net.dst.ip in {10.0.0.0/8}",

    "identity": "",

    "device_posture": ""

  }'


```

Replace `<PROXY_ENDPOINT_ID>` with your proxy endpoint ID.

## Restrict access to private networks

Restrict access to resources which you have connected through [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

The following example consists of two policies: the first allows specific users to reach your application, and the second blocks all other traffic.

### 1\. Allow company employees

* [ Dashboard ](#tab-panel-7675)
* [ API ](#tab-panel-7676)

| Selector       | Operator      | Value           | Logic | Action |
| -------------- | ------------- | --------------- | ----- | ------ |
| Destination IP | in            | 10.0.0.0/8      | And   | Allow  |
| User Email     | matches regex | .\*@example.com |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow company employees",

    "description": "Allow any users with an organization email to reach the application",

    "enabled": true,

    "action": "allow",

    "filters": [

        "l4"

    ],

    "traffic": "net.dst.ip in {10.0.0.0/8}",

    "identity": "identity.email matches \".*@example.com\"",

    "device_posture": ""

  }'


```

### 2\. Block everyone else

* [ Dashboard ](#tab-panel-7679)
* [ API ](#tab-panel-7680)

| Selector       | Operator | Value      | Action |
| -------------- | -------- | ---------- | ------ |
| Destination IP | in       | 10.0.0.0/8 | Block  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block everyone else",

    "description": "Block any other users from accessing the application",

    "enabled": true,

    "action": "block",

    "filters": [

        "l4"

    ],

    "traffic": "net.dst.ip in {10.0.0.0/8}",

    "identity": "",

    "device_posture": ""

  }'


```

## Override IP address

Override traffic directed toward a specific IP address with a different IP address.

* [ Dashboard ](#tab-panel-7681)
* [ API ](#tab-panel-7682)

| Selector         | Operator | Value        | Logic | Action           |
| ---------------- | -------- | ------------ | ----- | ---------------- |
| Destination IP   | in       | 203.0.113.17 | And   | Network Override |
| Destination Port | is       | 80           |       |                  |

| Override IP | Override Port |
| ----------- | ------------- |
| 1.1.1.1     | 80            |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Override example.com with 1.1.1.1",

    "description": "Override a site'\''s IP address with another IP",

    "enabled": true,

    "action": "l4_override",

    "filters": [

        "l4"

    ],

    "traffic": "net.dst.ip in {203.0.113.17} and net.dst.port == 80",

    "identity": "",

    "device_posture": "",

    "rule_settings": {

        "l4override": {

            "ip": "1.1.1.1",

            "port": 80

        },

        "override_host": "",

        "override_ips": null

    }

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/common-policies/#page","headline":"Common network policies · Cloudflare One docs","description":"Reference information for Common policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/common-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API","Private networks","Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/network-policies/","name":"Network policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/network-policies/common-policies/","name":"Common policies"}}]}
```
