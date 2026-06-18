---
title: Create Rate Limiting policies (beta)
description: Create Rate Limiting policies (beta) in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create Rate Limiting policies (beta)

Rate limiting policies (beta) allow you to set maximum traffic thresholds - measured in packets or bits per second — for incoming traffic destined for your network as it arrives at specific Cloudflare data centers. When traffic to a location exceeds your defined limit, the policy takes action.

This guide walks you through creating a policy that matches incoming packets and triggers when the traffic rate exceeds your configured threshold.

Note

For Cloudflare Advanced Network Firewall customers, rate limiting (beta) is available by request through the account team.

## Add a policy

To add a policy:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and go to **Networking** \> **Firewall policies**.
2. In the **Rate limiting** tab, select **Add a policy**.
3. Fill out the information for your new policy:  
   * Select the **Field**: At the moment, you can only choose a [data center name](https://developers.cloudflare.com/cloudflare-network-firewall/reference/network-firewall-fields/) (for example, `ORD` for Chicago).  
   * Select the **Operator**: Choose among **equals** or **is in**.  
   * Select the **Value**.
4. When you are done, select **Save policy**.

## Edit an existing policy

To edit a policy:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and go to **Networking** \> **Firewall policies**.
2. Select the **Rate limiting** tab.
3. Locate the policy you want to edit in the list and select **Edit**.
4. Edit the policy with your changes and select **Edit policy**.

## Delete an existing policy

To delete an existing policy:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and go to **Networking** \> **Firewall policies**.
2. Select the **Rate limiting** tab.
3. Locate the policy you want to delete from the list.
4. Select the three dots, then select **Remove**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/create-rate-limiting-policies/#page","headline":"Create Rate Limiting policies (beta) · Cloudflare One docs","description":"Create Rate Limiting policies (beta) in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/create-rate-limiting-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/","name":"Packet filtering"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/create-rate-limiting-policies/","name":"Create Rate Limiting policies (beta)"}}]}
```
