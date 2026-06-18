---
title: Create your first DNS policy
description: Build your first Gateway DNS policy.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create your first DNS policy

DNS policies determine how Gateway should handle a DNS request. When a user sends a DNS request, Gateway matches the request against your filters and either allows the query to resolve, blocks the query, or responds to the query with a different IP.

You can filter DNS traffic based on query or response parameters (such as domain, source IP, or geolocation). You can also filter by user identity if you connect your devices to Gateway with the [Cloudflare One Client or Cloudflare One Agent](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/connect-devices-networks/install-agent/).

To create a new DNS policy:

* [ Dashboard ](#tab-panel-9157)
* [ API ](#tab-panel-9158)
* [ Terraform ](#tab-panel-9159)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**.
2. In the **DNS** tab, select **Add a policy**.
3. Name the policy.
4. Under **Traffic**, build a logical expression that defines the traffic you want to allow or block.
5. Choose an **Action** to take when traffic matches the logical expression. For example, we recommend adding a policy to block all [security categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories):  
| Selector            | Operator | Value                | Action |  
| ------------------- | -------- | -------------------- | ------ |  
| Security Categories | in       | _All security risks_ | Block  |
6. Select **Create policy**.

For more information, refer to [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/).

To create a new DNS policy using cURL:

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-DNS-SecurityCategories-Blocklist",

    "description": "Block known security risks based on Cloudflare'\''s threat intelligence",

    "precedence": 0,

    "enabled": true,

    "action": "block",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})",

    "rule_settings": {

        "block_page_enabled": true,

        "block_reason": "This domain was blocked due to being classified as a security risk to your organization"

    }

  }'


```

To create a new DNS policy using **Terraform**:

```

resource "cloudflare_zero_trust_gateway_policy" "security_risks_dns_policy" {

  account_id  = var.cloudflare_account_id

  name        = "All-DNS-SecurityCategories-Blocklist"

  description = "Block known security risks based on Cloudflare's threat intelligence"

  precedence  = 0

  enabled     = true

  action      = "block"

  filters     = ["dns"]

  traffic     = "any(dns.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})"

  rule_settings {

      block_page_enabled = true

      block_page_reason = "This domain was blocked due to being classified as a security risk to your organization"

    }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/create-policy/#page","headline":"Create your first DNS policy · Cloudflare Learning Paths","description":"Build your first Gateway DNS policy.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/create-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-dns-policies/","name":"Build DNS security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-dns-policies/create-policy/","name":"Create your first DNS policy"}}]}
```
