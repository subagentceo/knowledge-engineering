---
title: Concepts
description: Key concepts for Advanced DDoS Protection, including prefixes, allowlists, and rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Concepts

## Prefixes

Advanced DDoS Protection protects the IP prefixes you select from sophisticated DDoS attacks. A prefix can be an IP address or an IP range in CIDR format. You must add prefixes to Advanced DDoS Protection so that Cloudflare can analyze incoming packets and offer protection against sophisticated TCP DDoS attacks.

Prefixes added to Advanced DDoS Protection must be one of the following:

* A prefix [onboarded to Magic Transit](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/).
* A subset of a prefix [onboarded to Magic Transit](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/).

You cannot add a prefix (or a subset of a prefix) that you have not onboarded to Magic Transit or whose status is still _Unapproved_. Contact your account team to get help with prefix approvals.

## Allowlist

The Advanced DDoS Protection allowlist is a list of prefixes that will bypass all configured Advanced DDoS Protection rules.

For example, you could add prefixes used only by partners of your company to the allowlist so that they are exempt from packet inspection and mitigation actions performed by Advanced DDoS Protection.

Important

Prefixes in the allowlist will be vulnerable to IP spoofing attacks. If an attacker can guess the source IP addresses you have allowlisted, their packets will be allowlisted.

## Rule

A rule configures Advanced DDoS Protection for a given [scope](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#scope), according to several [settings](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rule-settings): execution mode, burst sensitivity, and rate sensitivity.

Each system component (SYN flood protection and out-of-state TCP protection) has its own list of rules, and it should have at least one rule.

### Rule settings

Each rule type has the following settings: scope, mode, burst sensitivity, and rate sensitivity.

You may need to adjust the burst or rate sensitivity of a rule in case of false positives or due to specific traffic patterns.

#### Scope

Advanced TCP Protection rules can have one of the following scopes:

* **Global**: The rule will apply to all incoming packets.
* **Region**: The rule will apply to incoming packets in a selected region.
* **Data center**: The rule will apply to incoming packets in the selected Cloudflare data center.

The rule scope allows you to adjust the system's tolerance for out-of-state packets in locations where you may have more or less traffic than usual, or due to any other networking reasons.

When multiple rules with different scopes apply to a data center, the rule with the most specific scope takes precedence. For example, if you have both a region rule (such as Western Europe) and a data center rule (such as Marseille), traffic through Marseille will be processed according to the data center rule.

Besides defining rules with one of the above scopes, you must also select the [prefixes](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#prefixes) that you wish to protect with Advanced TCP Protection.

#### Mode

The Advanced TCP Protection system constantly learns your TCP connections to mitigate DDoS attacks. Advanced TCP Protection rules can have one of the following execution modes: monitoring, mitigation (enabled), or disabled.

* **Monitoring**  
   * In this mode, Advanced TCP Protection will not impact any packets. Instead, the protection system will learn your legitimate TCP connections and show you what it would have mitigated. Check Network Analytics to visualize what actions Advanced TCP Protection would have taken on incoming packets, according to the current configuration.  
   Refer to the [Analytics documentation](https://developers.cloudflare.com/analytics/network-analytics/configure/displayed-data/#view-logged-or-monitored-traffic) for more information on how to view logged or monitored traffic.
* **​​Mitigation (Enabled)**  
   * In this mode, Advanced TCP Protection will learn your legitimate TCP connections and perform mitigation actions on incoming TCP DDoS attacks based on the rule configuration (burst and rate sensitivity) and your [allowlist](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#allowlist).
* **Disabled**  
   * In this mode, a rule will not evaluate any incoming packets.

#### Burst sensitivity

The burst sensitivity is the rule's sensitivity to short-term bursts in the packet rate:

* A low sensitivity means that bigger spikes in the packet rate may trigger a mitigation action.
* A high sensitivity means that smaller spikes in the packet rate may trigger a mitigation action.

The default burst sensitivity is _Medium_.

#### Rate sensitivity

The rate sensitivity is the rule's sensitivity to the sustained packet rate:

* A low sensitivity means that higher sustained packet rates can trigger a mitigation action.
* A high sensitivity means that lower sustained packet rates may trigger a mitigation action. A high sensitivity offers increased protection, but you may get more false positives (that is, mitigated packets that belong to legitimate traffic).

The default rate sensitivity is _Medium_.

#### Profile sensitivity

Note

Profile sensitivity is available for [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/) only.

The sensitivity to DNS queries that have not been recently seen.

* A higher sensitivity level means that the mitigation system will begin mitigating faster.
* A lower sensitivity provides more tolerance for potentially suspicious DNS queries.

The default profile sensitivity and recommended setting is _Low_. You should only increase sensitivity if it is needed based on observed attacks.

## Filter

A filter modifies Advanced TCP Protection's [execution mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#mode) — monitoring, mitigation (enabled), or disabled — for all incoming packets matching an expression.

The filter expression can reference source and destination IP addresses and ports. Each system component (SYN flood protection and out-of-state TCP protection) should have one or more [rules](#rule), but filters are optional.

Each system component has its own filters. You can configure a filter for each execution mode:

* **Mitigation Filter**: The system will drop packets matching the filter expression.
* **Monitoring Filter**: The system will log packets matching the filter expression.
* **Off Filter**: The system will ignore packets matching the filter expression.

When there is a match, a filter will alter the execution mode for all configured rules in a given system component (SYN flood protection or out-of-state TCP protection), including disabled rules.

For instructions on creating filters in the Cloudflare dashboard, refer to [Create a filter](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/create-filter/). For API examples, refer to [Common API calls](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/examples/).

### Example use case

You can create a monitor filter for a new prefix that you are onboarding by using the expression to match against the prefix.

Your already onboarded prefixes can remain protected with one or more configured rules in mitigation mode.

When onboarding a new prefix, you would configure a monitoring filter for this prefix and then add it to Advanced TCP Protection.

---

## Determining the execution mode

When you have both rules and filters configured, the execution mode is determined according to the following:

1. If there is a match for one of the configured filters, use the filter's execution mode. The filter evaluation order is based on their mode, in the following order:  
   1. Mitigation filter (filter with `enabled` mode)  
   2. Monitoring filter (filter with `monitoring` mode)  
   3. Off filter (filter with `disabled` mode)
2. If no filter matched, use the execution mode determined by existing rules.
3. If no rules match, disable Advanced TCP Protection.

---

## Mitigation reasons

The Advanced TCP Protection system applies mitigation actions for different reasons based on the connection states. The **Mitigation reason** field shown in the **Advanced TCP Protection** tab of the [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) dashboard will contain more information on why a given packet was dropped by the system.

The connection states are the following:

* **New**: A SYN or SYN-ACK packet has been sent to attempt to open a new connection.
* **Open**: The three-way TCP handshake has been completed and the TCP connection is open.
* **Closing**: A FIN or FIN-ACK packet has been seen attempting to close a connection.
* **Closed**: The closing three-way handshake has been completed, or an RST packet has closed the connection.

The mitigation reasons are the following:

| Reason               | Description                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Unexpected**       | Packet dropped because it was not expected given the current state of the TCP connection it was associated with.                                 |
| **Challenge needed** | Packet challenged because the system determined that the packet is most likely part of a packet flood.                                           |
| **Challenge passed** | Packet dropped because it belongs to a solved challenge.                                                                                         |
| **Not found**        | Packet dropped because it is not part of an existing TCP connection and it is not establishing a new connection.                                 |
| **Out of sequence**  | Packet dropped because its properties (for example, TCP flags or sequence numbers) do not match the expected values for the existing connection. |
| **Already closed**   | Packet dropped because it belongs to a connection that is already closed.                                                                        |

Mitigation will only occur based on your Advanced TCP Protection configuration (rule sensitivities, configured allowlists and prefixes). The protection system will provide some tolerance to out-of-state packets to accommodate for the natural randomness of Internet routing.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#page","headline":"Create an Advanced TCP Protection filter · Cloudflare DDoS Protection docs","description":"Key concepts for Advanced DDoS Protection, including prefixes, allowlists, and rules.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/concepts/","name":"Concepts"}}]}
```
