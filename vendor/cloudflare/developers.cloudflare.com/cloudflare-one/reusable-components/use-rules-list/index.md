---
title: Use IP lists
description: Use IP lists in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use IP lists

[IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) are a part of Cloudflare's custom lists. Custom lists contain one or more items of the same type — IP addresses, hostnames or ASNs — that you can reference in rule expressions.

IP lists are defined at the account level and can be used to match against `ip.src` and `ip.dst` fields. Currently, Cloudflare Network Firewall only supports IPv4 addresses in these lists, not IPv6.

To use this feature:

## 1\. Create a [new IP list](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/create/).

For example:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rules/lists \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "name": "iplist",

  "description": "This contains IPs that should be allowed.",

  "kind": "ip"

}'


```

## 2\. Add IPs to the list

Next, [create list items](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/create/). This will add elements to the current list.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rules/lists/{list_id}/items \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '[

  {"ip":"10.0.0.1"},

  {"ip":"10.10.0.0/24"}

]'


```

## 3\. Use the list in a rule

Finally, add a Cloudflare Network Firewall rule referencing the list into an existing ruleset:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}/rules \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "action": "skip",

  "action_parameters": {

    "ruleset": "current"

  },

  "expression": "ip.src in $iplist",

  "description": "Allowed IPs from iplist",

  "enabled": true

}'


```

## Managed lists

Note

Available for customers with a Cloudflare Network Firewall Advanced plan.

You can create rules with managed lists. Managed IP Lists are [lists of IP addresses](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists) maintained by Cloudflare and updated frequently.

You can access these managed lists when you create rules with either _IP destination address_ or _IP source address_ in the **Field** dropdown, and _is in list_ or _is not in list_ in the **Operator** dropdown.

For example:

| Field                    | Operator     | Value         |
| ------------------------ | ------------ | ------------- |
| _IP destination address_ | _is in list_ | _Anonymizers_ |

## List types

### Threat intelligence

Cloudflare handles millions of HTTP requests each second and blocks billions of cyber threats each day. Cloudflare uses that data to detect malicious actors on the Internet and turns that information into a list of known malicious IP addresses. Cloudflare also integrates with a number of third-party vendors to augment the coverage.

The threat intelligence feed categories are described in [Managed IP Lists](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists). All of these lists are compatible with Cloudflare Network Firewall.

### IP lists

Use [IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) to group services in networks, like web servers, or for lists of known bad IP addresses to make managing good network endpoints easier. IP lists are helpful for users with very expansive firewall rules with many IP lists. By default, you can add up to 10,000 IPs across all lists. Refer to [Use an IP list](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/add-policies/#use-an-ip-list) to check an example of how to use an IP list.

### Geo-blocking

Geo-blocking enables you to selectively allow or block traffic to any country. Refer to [Block a country](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/add-policies/#block-a-country) to check an example of how to block a country.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/use-rules-list/#page","headline":"Define an IP list · Cloudflare One docs","description":"Use IP lists in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/use-rules-list/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/use-rules-list/","name":"Use IP lists"}}]}
```
