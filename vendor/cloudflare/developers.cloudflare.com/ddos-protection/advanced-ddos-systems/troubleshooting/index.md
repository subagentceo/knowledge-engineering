---
title: Troubleshooting Advanced TCP Protection
description: Troubleshoot common issues with Advanced TCP Protection, including mode transitions, false positives, allowlist behavior, and false negatives.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting Advanced TCP Protection

## Mode transition behavior

Advanced TCP Protection rules have three execution modes: **Disabled**, **Monitoring** (logs only, no drops), and **Mitigation (Enabled)** (active mitigation).

Always transition from Monitoring mode to Mitigation (Enabled) mode. Do not switch directly from Disabled to Mitigation (Enabled).

When you switch directly from Disabled to Mitigation (Enabled), Advanced TCP Protection begins a learning period to observe existing connection state. Long-lived connections that pre-date this learning period may be dropped because they have no state in the tracker.

**Recommended procedure:**

1. Set to **Monitoring** mode for at least 4 hours (longer if your network has long-lived connections).
2. Review the Monitoring mode logs in [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) to confirm legitimate traffic patterns.
3. Switch to **Mitigation (Enabled)** mode.

## Legitimate traffic is being dropped (false positives)

Check the **Mitigation reason** field in the **Advanced TCP Protection** tab of [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) and use the reason to identify the cause:

| Mitigation reason                | Likely cause                                                                              | Action                                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Not found**                    | Learning period was incomplete, or long-lived connections pre-date ATP activation         | Set to Monitoring mode for 4+ hours, then switch to Mitigation (Enabled)                                |
| **Unexpected**                   | ECMP rehashing — packets from the same flow arriving at different Cloudflare data centers | Set to Monitoring mode; increase burst sensitivity threshold for affected colos; escalate if persistent |
| **Out of sequence**              | Packet reordering or packet loss in the network path                                      | Increase burst sensitivity threshold for the affected colo                                              |
| Drops during traffic spikes only | Burst sensitivity threshold too low                                                       | Increase burst sensitivity (keep rate sensitivity the same)                                             |

**Threshold tuning:** Adjust burst sensitivity before rate sensitivity. Burst sensitivity handles momentary spikes; rate sensitivity controls sustained packet rates.

## Traffic from known sources is being challenged

The ATP allowlist allows you to bypass mitigation for specific source IP prefixes. However:

* The allowlist supports approximately **200 IP addresses per allowlist expression**. For more information, refer to [Add an IP or prefix to the allowlist](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix-allowlist/).
* The allowlist is **not a security control** — it is bypass-by-IP-address, which is vulnerable to IP address spoofing. Do not add large IP ranges (for example, entire data center IP blocks) to the allowlist.
* For large-scale legitimate traffic sources, prefer adjusting rule sensitivities rather than adding broad allowlist entries.

## Known limitations

* **TCP only:** Advanced TCP Protection covers TCP traffic. UDP and ICMP flood attacks are handled by [HTTP DDoS Attack Protection managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/) or [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) rules.
* **ECMP "shifty flows":** When packets from the same TCP flow arrive at different Cloudflare data centers (due to ECMP load balancing upstream), ATP loses connection state and may drop packets with the **Unexpected** mitigation reason. This is a known architecture constraint. Mitigation: reduce burst sensitivity or adjust per-colo thresholds for affected colos.

## Attacks not being blocked (false negatives)

1. Confirm the rule mode is **Mitigation (Enabled)**, not **Monitoring** — Monitoring mode logs but does not drop.
2. Check that rule sensitivities are set appropriately for the attack traffic volume. Lower sensitivity means more traffic must exceed the threshold before mitigation triggers.
3. For distributed attacks spread across many source IPs and colos: adjust per-colo thresholds for the top-traffic colos.
4. Confirm filters are not bypassing the mitigation — a filter that matches attack traffic will override the rule's execution mode.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/troubleshooting/#page","headline":"Troubleshooting Advanced TCP Protection · Cloudflare DDoS Protection docs","description":"Troubleshoot common issues with Advanced TCP Protection, including mode transitions, false positives, allowlist behavior, and false negatives.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/troubleshooting/","name":"Troubleshooting Advanced TCP Protection"}}]}
```
