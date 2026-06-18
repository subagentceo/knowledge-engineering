---
title: How DDoS protection works
description: How Cloudflare analyzes traffic and applies autonomous mitigation at the network edge.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How DDoS protection works

To detect and mitigate DDoS attacks, Cloudflare's autonomous edge and centralized DDoS systems analyze traffic samples out of path, which allows Cloudflare to asynchronously detect DDoS attacks without causing latency or impacting performance.

The analyzed samples include:

* **Packet fields** such as the source IP, source port, destination IP, destination port, protocol, TCP flags, sequence number, options, and packet rate.
* **HTTP request metadata** such as HTTP headers, user agent, query-string, path, host, HTTP method, HTTP version, TLS cipher version, and request rate.
* **HTTP response metrics** such as error codes returned by customers' origin servers and their rates.

Cloudflare uses a set of dynamic rules that scan for attack patterns, known attack tools, suspicious patterns, protocol violations, requests causing large amounts of origin errors, excessive traffic hitting the origin or cache, and additional attack vectors. Each rule has a predefined sensitivity level and default action that varies based on the rule's confidence that the traffic is indeed part of an attack.

Note

You can set an override expression for the [HTTP DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-expressions/) or [Network-layer DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/override-expressions/) managed ruleset to define a specific scope for sensitivity level or action adjustments.

Once attack traffic matches a rule, Cloudflare's systems will track that traffic and generate a real-time signature to surgically match against the attack pattern and mitigate the attack without impacting legitimate traffic. The rules are able to generate different signatures based on various properties of the attacks and the signal strength of each attribute. For example, if the attack is distributed — that is, originating from many source IPs — then the source IP field will not serve as a strong indicator, and the rule will not choose the source IP field as part of the attack signature. Once generated, the fingerprint is propagated as a mitigation rule to the most optimal location on the Cloudflare global network for cost-efficient mitigation. These mitigation rules are ephemeral and will expire shortly after the attack has ended, which happens when no additional traffic has been matched to the rule.

| Actions               | Description                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| Block                 | Matching requests are denied access to the site.                                                        |
| Managed Challenge     | Depending on the characteristics of a request, Cloudflare will choose an appropriate type of challenge. |
| Interactive Challenge | The client that made the request must pass an interactive Challenge.                                    |
| Log                   | Records matching requests in the Cloudflare Logs.                                                       |
| Use rule defaults     | Uses the default action that is pre-defined for each rule.                                              |

## Thresholds

Thresholds vary for each rule and there are different thresholds globally and per colocation. Within a rule, the traffic is fingerprinted and the thresholds are per fingerprint, and it is difficult to know ahead of time which rules, colocations, or fingerprints your traffic generates, so the threshold numbers are not necessarily valuable.

Instead, Cloudflare's DDoS Protection system provides the sensitivity adjustment. If you experience a false positive, you can decrease the sensitivity. You can also use the `Log` action to help find an appropriate sensitivity level. You can decrease the sensitivity while in `Log` mode until the rule no longer matches.

## Time to mitigate

* Immediate mitigation for Advanced TCP and DNS Protection systems.
* Up to three seconds on average for the detection and mitigation of L3/4 DDoS attacks at the edge using the Network-layer DDoS Protection Managed rules.
* Up to three seconds on average for the detection and mitigation of HTTP DDoS attacks at the edge using the HTTP DDoS Protection Managed rules.

## Data localization

To learn more about how DDoS protection works with data localization, refer to the Data Localization Suite [product compatibility](https://developers.cloudflare.com/data-localization/compatibility/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/about/how-ddos-protection-works/#page","headline":"How DDoS protection works · Cloudflare DDoS Protection docs","description":"How Cloudflare analyzes traffic and applies autonomous mitigation at the network edge.","url":"https://developers.cloudflare.com/ddos-protection/about/how-ddos-protection-works/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/about/","name":"About"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/about/how-ddos-protection-works/","name":"How DDoS protection works"}}]}
```
