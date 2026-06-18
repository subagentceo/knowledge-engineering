---
title: Secure your first application
description: Create policies for your first application.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Secure your first application

To ensure holistic security precautions, we recommend securing each distinct private application with at least two policies:

* A [Gateway DNS policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) with the appropriate identity and device posture values, targeting the domain list that defines your application. Policy enforcement happens at the request resolution event, before the user's device makes a connection request to the application itself; if denied here, no traffic will reach your private network.
* A [Gateway network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) with the same identity and device posture values as the DNS policy, targeting the IP list that defines your application. You can optionally include the domain list by matching the SNI header. Then, you can include any combinations of ports or protocols that are relevant for application access. Network policy enforcement happens after the user passes the DNS policy, when the user's device attempts to connect to the target application.

## Create a Gateway policy

To create a new policy, open the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**.

## Example DNS policy

* [ Dashboard ](#tab-panel-9098)
* [ API ](#tab-panel-9099)
* [ Terraform (v5) ](#tab-panel-9100)

| Traffic Selector | Operator | Value                |
| ---------------- | -------- | -------------------- |
| Domain           | in list  | Company Wiki domains |

| Identity Selector | Operator      | Value           |
| ----------------- | ------------- | --------------- |
| User email        | matches regex | .\*@example.com |

| Action |
| ------ |
| Allow  |

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "name": "Company Wiki DNS policy",

  "conditions": [

    {

      "type": "traffic",

      "expression": {

        "any": {

          "in": {

            "lhs": {

              "splat": "dns.domains"

            },

            "rhs": "$<DOMAIN_LIST_ID>"

          }

        }

      }

    },

    {

      "type": "identity",

      "expression": {

        "matches": {

          "lhs": "identity.email",

          "rhs": ".*@example.com"

        }

      }

    }

  ],

  "action": "allow",

  "precedence": 13002,

  "enabled": true,

  "description": "Allow employees to access company wiki domains.",

  "filters": [

    "dns"

  ]

}'


```

```

resource "cloudflare_zero_trust_gateway_policy" "dns_allow_wiki_domains" {

  name        = "Company Wiki DNS policy"

  enabled     = true

  account_id  = var.cloudflare_account_id

  description = "Managed by Terraform - Allow employees to access company wiki domains."

  precedence  = 102

  action      = "allow"

  filters     = ["dns"]

  traffic     = "any(dns.domains[*] in ${"$"}${cloudflare_zero_trust_list.wiki_domains.id})"

  identity    = "identity.email matches \".*@example.com\""

}


```

## Example network policy

* [ Dashboard ](#tab-panel-9101)
* [ API ](#tab-panel-9102)
* [ Terraform (v5) ](#tab-panel-9103)

| Traffic Selector | Operator | Value            |
| ---------------- | -------- | ---------------- |
| Destination IP   | in list  | Company Wiki IPs |

| Identity Selector | Operator      | Value           |
| ----------------- | ------------- | --------------- |
| User Email        | matches regex | .\*@example.com |

| Action |
| ------ |
| Allow  |

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "name": "Company Wiki network policy",

  "conditions": [

    {

      "type": "traffic",

      "expression": {

        "in": {

          "lhs": "net.dst.ip",

          "rhs": "$<IP_LIST_ID>"

        }

      }

    },

    {

      "type": "identity",

      "expression": {

        "matches": {

          "lhs": "identity.email",

          "rhs": ".*@example.com"

        }

      }

    }

  ],

  "action": "allow",

  "precedence": 13002,

  "enabled": true,

  "description": "Allow employees to access company wiki IPs.",

  "filters": [

    "l4"

  ]

}'


```

```

resource "cloudflare_zero_trust_gateway_policy" "network_allow_wiki_IPs" {

  name        = "Company Wiki Network policy"

  enabled     = true

  account_id  = var.cloudflare_account_id

  description = "Managed by Terraform - Allow employees to access company wiki IPs."

  precedence  = 103

  action      = "allow"

  filters     = ["l4"]

  traffic     = "net.dst.ip in ${"$"}${cloudflare_zero_trust_list.wiki_IPs.id}"

  identity    = "identity.email matches \".*@example.com\""

}


```

### Catch-all policy

We recommend adding a catch-all policy to the bottom of your network policy list. An effective Zero Trust model should prioritize default-deny actions to avoid any overly permissive policy building. For example,

* [ Dashboard ](#tab-panel-9104)
* [ API ](#tab-panel-9105)
* [ Terraform (v5) ](#tab-panel-9106)

| Traffic Selector | Operator | Value                      | Logic |
| ---------------- | -------- | -------------------------- | ----- |
| Destination IP   | in list  | All private network ranges | Or    |
| SNI Domain       | in list  | All private apex domains   |       |

| Action |
| ------ |
| Block  |

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "name": "Catch-all block policy",

  "conditions": [

    {

      "type": "traffic",

      "expression": {

        "or": [

          {

            "in": {

              "lhs": "net.dst.ip",

              "rhs": "$<IP_LIST_ID>"

            }

          },

          {

            "any": {

              "in": {

                "lhs": {

                  "splat": "net.sni.domains"

                },

                "rhs": "$<DOMAIN_LIST_ID>"

              }

            }

          }

        ]

      }

    }

  ],

  "action": "block",

  "precedence": 14002,

  "enabled": true,

  "description": "Block access to private network.",

  "filters": [

    "l4"

  ]

}'


```

```

resource "cloudflare_zero_trust_gateway_policy" "network_catch_all" {

  name        = "Catch-all block policy"

  enabled     = true

  account_id  = var.cloudflare_account_id

  description = "Managed by Terraform - Block access to private network."

  precedence  = 14002

  action      = "block"

  filters     = ["l4"]

  traffic     = "net.dst.ip in ${"$"}${cloudflare_zero_trust_list.private_IPs.id} or any(net.sni.domains[*] in ${"$"}${cloudflare_zero_trust_list.private_domains.id})"

}


```

Network policies are evaluated in [top-down order](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence), so if a user does not match an explicitly defined policy for an application, they will be blocked. To learn how multiple policies interact, refer to [Order of enforcement](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/).

Note

It is not recommended to employ a default-deny model while testing. Instead, build your explicit application policies and [monitor your logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) to determine if your policies are working as expected. If you do not see the policies triggering in your logs, you may need to tune your policies and review what kind of information (identity groups, device posture values, etc.) is being sent with your traffic.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/create-policy/#page","headline":"Secure your first application · Cloudflare Learning Paths","description":"Create policies for your first application.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/create-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/build-policies/","name":"Build secure access policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/build-policies/create-policy/","name":"Secure your first application"}}]}
```
