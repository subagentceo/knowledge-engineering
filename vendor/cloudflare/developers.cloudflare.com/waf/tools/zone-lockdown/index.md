---
title: Zone Lockdown
description: Restrict access to specific URLs by allowlisted IP addresses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zone Lockdown

Zone Lockdown specifies a list of one or more IP addresses, CIDR ranges, or networks that are the only IPs allowed to access a domain, subdomain, or URL. You can configure multiple destinations, including IPv4/IPv6 addresses, in a single zone lockdown rule.

All IP addresses not specified in the zone lockdown rule will not have access to the specified resources. Requests from those IP addresses will receive an `Access Denied` response.

Note

Cloudflare recommends that you use [custom rules](https://developers.cloudflare.com/waf/custom-rules/) instead of zone lockdown rules to block requests from IP addresses not present in an allowlist of IPs and CIDR ranges.

For examples of using custom rules for this purpose, refer to the following use cases:

* [Allow traffic from IP addresses in allowlist only](https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/)
* [Require known IP addresses in site admin area](https://developers.cloudflare.com/waf/custom-rules/use-cases/site-admin-only-known-ips/)

## Availability

Cloudflare Zone Lockdown is available on paid plans. However, this feature is only available in the [new security dashboard](https://developers.cloudflare.com/security/) if you have configured at least one zone lockdown rule.

The number of available zone lockdown rules depends on your Cloudflare plan.

| Free            | Pro | Business | Enterprise |     |
| --------------- | --- | -------- | ---------- | --- |
| Availability    | No  | Yes      | Yes        | Yes |
| Number of rules | 0   | 3        | 10         | 200 |

## Create a zone lockdown rule

* [  New dashboard ](#tab-panel-11278)
* [ Old dashboard ](#tab-panel-11279)
* [ API ](#tab-panel-11280)

Note

Zone Lockdown is only available in the [new security dashboard](https://developers.cloudflare.com/security/) if you have configured at least one zone lockdown rule.

**If you have access to Zone Lockdown rules**

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Zone lockdown rules**.  
If this option is not available, refer to the instructions below.
3. Enter a descriptive name for the rule in **Name**.
4. For **URLs**, enter the domains, subdomains, or URLs you wish to protect from unauthorized IPs. You can use wildcards such as `*`. Enter one item per line.
5. For **IP Range**, enter one or more allowed IPv4/IPv6 addresses or CIDR ranges, one per line. Only these IP addresses and ranges will be able to access the resources you entered in **URLs**.
6. (Optional) If you are creating a zone lockdown rule that overlaps with an existing rule, expand **Advanced Options** and enter a priority for the rule in **Priority**. The lower the number, the higher the priority. Higher priority rules take precedence.
7. Select **Save and Deploy lockdown rule**.

**If you do not have access to Zone Lockdown rules**

Create a [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) to perform zone lockdown:

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Templates**, and then select the template **Allow only specified IP addresses**.
3. Fill in the required fields and select **Deploy**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** \> **WAF**, and select the **Tools** tab.
3. Under **Zone Lockdown**, select **Create lockdown rule**.
4. Enter a descriptive name for the rule in **Name**.
5. For **URLs**, enter the domains, subdomains, or URLs you wish to protect from unauthorized IPs. You can use wildcards such as `*`. Enter one item per line.
6. For **IP Range**, enter one or more allowed IPv4/IPv6 addresses or CIDR ranges, one per line. Only these IP addresses and ranges will be able to access the resources you entered in **URLs**.
7. (Optional) If you are creating a zone lockdown rule that overlaps with an existing rule, expand **Advanced Options** and enter a priority for the rule in **Priority**. The lower the number, the higher the priority. Higher priority rules take precedence.
8. Select **Save and Deploy lockdown rule**.

Issue a `POST` request for the [Create a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/create/) operation similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Firewall Services Write`

Create a Zone Lockdown rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "Block all traffic to staging and wiki unless it comes from HQ or branch offices",

    "urls": [

        "staging.example.com/*",

        "example.com/wiki/*"

    ],

    "configurations": [

        {

            "target": "ip_range",

            "value": "192.0.2.0/24"

        },

        {

            "target": "ip_range",

            "value": "2001:DB8::/64"

        },

        {

            "target": "ip",

            "value": "203.0.133.1"

        }

    ]

  }'


```

### Example rule

The following example rule will only allow visitors connecting from a company’s headquarters or branch offices to access the staging environment and the wiki:

* Name:  
```  
Block all traffic to staging and wiki unless it comes from HQ or branch offices  
```
* URLs:  
```  
staging.example.com/*  
example.com/wiki/*  
```
* IP Range:  
```  
192.0.2.0/24  
2001:DB8::/64  
203.0.133.1  
```

This example would not protect an internal wiki located on a different directory path such as `example.com/internal/wiki`.

Note

A [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) with an equivalent behavior would have the following configuration:

**Description**:  
`Block all traffic to staging and wiki unless it comes from HQ or branch offices`

**Expression**:

```

((http.host eq "staging.example.com") or (http.host eq "example.com" and http.request.uri.path wildcard "/wiki/*")) and not ip.src in {192.0.2.0/24 2001:DB8::/64 203.0.133.1}


```

**Action**: _Block_

## Access denied example

A visitor from an unauthorized IP will get the following error when there is a match for a zone lockdown rule:

![Example of Error 1106 \(access denied\) received by a user accessing the zone from an unauthorized IP address](https://developers.cloudflare.com/_astro/zone-lockdown-rule-error-1106-access-denied.BUWE8ETx_pgVLG.webp) 

---

## Related resources

* [Secure your application](https://developers.cloudflare.com/learning-paths/application-security/account-security/)
* [User Agent Blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/)
* [Allow Health Checks to bypass Zone Lockdown](https://developers.cloudflare.com/health-checks/how-to/zone-lockdown/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/zone-lockdown/#page","headline":"Zone Lockdown · Cloudflare Web Application Firewall (WAF) docs","description":"Restrict access to specific URLs by allowlisted IP addresses.","url":"https://developers.cloudflare.com/waf/tools/zone-lockdown/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/zone-lockdown/","name":"Zone Lockdown"}}]}
```
