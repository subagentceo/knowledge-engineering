---
title: Custom lists
description: Create custom lists of IPs, hostnames, or ASNs for use in rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom lists

A custom list contains one or more items of the same type (for example, IP addresses, hostnames, or ASNs) that you can reference collectively, by name, in rule expressions.

Cloudflare supports the following custom list types:

* [Lists with IP addresses](#ip-lists) (also known as IP lists)
* [Lists with hostnames](#lists-with-hostnames)
* [Lists with ASNs](#lists-with-asns) ([autonomous system ↗](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) numbers)

Note

Lists with hostnames and ASNs are only available to Enterprise customers. Refer to [Availability](https://developers.cloudflare.com/waf/tools/lists/#availability) for details.

Each type has its own properties and CSV file format. Refer to the following sections for details.

For more information on lists managed by Cloudflare, such as Managed IP Lists, refer to [Managed Lists](https://developers.cloudflare.com/waf/tools/lists/managed-lists/).

## Create a custom list

Refer to [Create a list in the dashboard](https://developers.cloudflare.com/waf/tools/lists/create-dashboard/) or to the [Lists API](https://developers.cloudflare.com/waf/tools/lists/lists-api/) page.

## Use a custom list

Use custom lists in rule [expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) with the `in` operator and with a field supported by the custom list:

```

<FIELD> in $<LIST_NAME>


```

The fields you can use vary according to the list item type:

| List item type | Available fields                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| IP address     | Fields with type IP address listed in the [Fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) |
| Hostname       | http.host                                                                                                                                       |
| ASN            | ip.src.asnum                                                                                                                                    |

For more information and examples, refer to [Use lists in expressions](https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/).

---

## Custom list types

### Lists with IP addresses (IP lists)

List items in custom lists with IP addresses must be in one of the following formats:

* Individual IPv4 addresses
* Individual IPv6 addresses
* IPv4 CIDR ranges with a prefix from `/8` to `/32`
* IPv6 CIDR ranges with a prefix from `/12` to `/128`

The same list can contain both individual addresses and CIDR ranges.

You can use uppercase or lowercase characters for IPv6 addresses in lists. However, when you save the list, uppercase characters are converted to lowercase.

CSV file format

When uploading items to a custom list with IP addresses via CSV file, use the following file format (enter one item per line):

```

<IP_ADDRESS_1>,<DESCRIPTION>

<IP_ADDRESS_2>


```

The `<DESCRIPTION>` field is optional.

### Lists with hostnames

Note

Available to Enterprise customers.

List items in custom lists with hostnames must be Fully Qualified Domain Names (FQDNs). An item may contain a `*` prefix/subdomain wildcard, which must be followed by a `.` (period). An item cannot include a scheme (for example, `https://`) or a URL path.

For example, the following entries would be valid for a custom list with hostnames:

* `example.com`
* `api.example.com`
* `*.example.com`

However, `example.com/path/subfolder` would not be a valid entry.

You can add any valid hostname (a valid FQDN) to a custom list with hostnames. The hostnames do not need to belong to the current Cloudflare account.

CSV file format

When uploading items to a custom list with hostnames via CSV file, use the following file format:

```

<HOSTNAME_1>,<DESCRIPTION>

<HOSTNAME_2>


```

The `<DESCRIPTION>` field is optional.

### Lists with ASNs

Note

Available to Enterprise customers.

List items in custom lists with autonomous system numbers (ASNs) must be integer values.

For example, the following entries would be valid for a list with ASNs:

* `1`
* `13335`
* `64512`

CSV file format

When uploading items to a custom list with ASNs via CSV file, use the following file format:

```

<ASN_1>,<DESCRIPTION>

<ASN_2>


```

The `<DESCRIPTION>` field is optional.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/lists/custom-lists/#page","headline":"Custom lists · Cloudflare Web Application Firewall (WAF) docs","description":"Create custom lists of IPs, hostnames, or ASNs for use in rules.","url":"https://developers.cloudflare.com/waf/tools/lists/custom-lists/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/lists/","name":"Lists"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/lists/custom-lists/","name":"Custom lists"}}]}
```
