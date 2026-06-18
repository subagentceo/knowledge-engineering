---
title: Form expressions
description: How Form expressions works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Form expressions

Rules are written using the Cloudflare Rules language - a domain-specific language (DSL) intended to mimic Wireshark semantics. For more information, refer to the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) documentation.

To start with a simple case, review below how you would match a source IP. In this expression, `ip.src` refers to the source IP address of the incoming packet, and `==` means "equals":

```

ip.src == 192.0.2.0


```

Expressions can be more complex by joining multiple clauses via a logical operator (`&&` means AND, `||` means OR). The following expression matches packets from `192.0.2.1` that also have the TCP push or reset flag set:

```

ip.src == 192.0.2.1 && (tcp.flags.push || tcp.flags.reset)


```

## Capabilities

You can use Cloudflare Network Firewall to skip or block packets based on source or destination IP, source or destination port, protocol, packet length, or bit field match.

## Restrictions

The expression engine supports CIDR notation (IP address ranges like `192.0.2.0/24`), but only inside curly-brace sets. A bare comparison will not work as expected:

```

ip.src == 192.0.2.0/24  # bad

ip.src in { 192.0.2.0/24 }  # good


```

Expressions have a complexity limit that is easily reached when many joined or nested clauses are in the expression. Here's an example:

```

(tcp.dstport == 1000 || tcp.dstport == 1001) && (tcp.dstport == 1002 || tcp.dstport == 1003) && (tcp.dstport == 1004 || tcp.dstport == 1005) && (tcp.dstport == 1006 || tcp.dstport == 1007) && (tcp.dstport == 1008 || tcp.dstport == 1009) && (tcp.dstport == 1010 || tcp.dstport == 1011) && (tcp.dstport == 1012 || tcp.dstport == 1013) && (tcp.dstport == 1014 || tcp.dstport == 1015) && (tcp.dstport == 1016 || tcp.dstport == 1017)


```

If the limit is reached, the response will have a `400` status code and an error message of `ruleset exceeds complexity constraints`. Split the expression across multiple rules and try again. Each rule can handle a subset of the conditions, and the firewall evaluates them in order.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/form-expressions/#page","headline":"Form an expression · Cloudflare One docs","description":"How Form expressions works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/form-expressions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/","name":"Packet filtering"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/form-expressions/","name":"Form expressions"}}]}
```
