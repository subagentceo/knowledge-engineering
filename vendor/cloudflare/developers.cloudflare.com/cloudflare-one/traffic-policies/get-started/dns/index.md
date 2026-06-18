---
title: DNS filtering
description: DNS filtering in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS filtering

Secure Web Gateway allows you to inspect DNS traffic — the queries your devices make to translate domain names like `example.com` into IP addresses — and control which websites users can visit. Because every connection starts with a DNS lookup, DNS filtering blocks threats at the earliest stage of a connection, before the device ever reaches the destination. Use DNS policies to block malware domains, phishing sites, or entire content categories across your organization.

Note

For a more detailed guide to filtering DNS queries and other traffic for your organization, refer to the [Secure your Internet traffic and SaaS apps](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/concepts/) implementation guide.

## 1\. Connect to Gateway

You can filter DNS queries from individual devices (for example, employee laptops) or from entire network locations (for example, an office router). Choose the option that matches your deployment.

### Connect devices

To filter DNS requests from an individual device such as a laptop or phone:

1. [Install the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) on your device. The Cloudflare One Client is a lightweight agent that routes the device's DNS queries through Cloudflare so Gateway can inspect and filter them.
2. [Enroll the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) in your organization's Zero Trust instance \[^1\]. This tells WARP which Gateway policies to enforce.
3. (Optional) If you want to display a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/) instead of a generic browser error when a request is blocked, [install a Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on your device.

### Connect DNS locations

To filter DNS requests from a network location such as an office or data center without installing software on each device:

1. [Add the location](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) to your Cloudflare One settings. A DNS location represents a network (such as an office) whose DNS queries you want to filter.
2. On your router, browser, or OS, change the DNS server setting to point to the Cloudflare address shown in the location setup UI. This forwards all DNS queries from that network through Gateway.

Note

Gateway uses different methods to identify which location a query comes from, depending on the protocol:

* **IPv4 queries** — Gateway matches the query to a location based on the source IP address of your network. Under **Networks** \> **Resolvers & Proxies** \> **DNS locations**, verify that the **Source IPv4 Address** matches the public IP of the network you want to protect.
* **IPv6, DNS over TLS (DOT), or DNS over HTTPS (DOH) queries** — Because these protocols may obscure the source IP, Gateway instead matches queries using the unique DNS forwarding address assigned to each location. Make sure your resolver is configured with the correct forwarding address for the location you want policies to apply to.

## 2\. Verify device connectivity

To confirm that your device's DNS queries are flowing through Gateway:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. Under **Log traffic activity**, enable activity logging for all DNS logs.
3. On your device, open a browser and go to any website.
4. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs** \> **DNS**.
5. Make sure DNS queries from your device appear.

## 3\. Create your first DNS policy

A DNS policy has two parts: a **traffic condition** that defines which queries to match (for example, all queries to gambling sites) and an **action** that defines what to do with matching queries (for example, block them). To create a new DNS policy:

* [ Dashboard ](#tab-panel-7606)
* [ API ](#tab-panel-7607)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**.
2. In the **DNS** tab, select **Add a policy**.
3. Name the policy.
4. Under **Traffic**, use the condition builder to define which DNS queries this policy applies to. Select a selector (such as **Security Categories**), an operator (such as **in**), and one or more values.
5. Choose an **Action** to take when traffic matches the condition. For example, we recommend adding a policy to block all [security categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories):  
| Selector            | Operator | Value                | Action |  
| ------------------- | -------- | -------------------- | ------ |  
| Security Categories | in       | _All security risks_ | Block  |
6. Select **Create policy**.

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
| Type    | Item       | Permission |  
| ------- | ---------- | ---------- |  
| Account | Zero Trust | Edit       |
2. (Optional) Configure your API environment variables to include your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and API token.
3. Send a `POST` request to the [Create a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/create/) endpoint. For example, the following request creates a policy that blocks all default [security categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories). The numeric IDs in the `traffic` field (such as `68`, `178`, `80`) correspond to Cloudflare's predefined security threat categories — refer to [domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories) for the full mapping. The `precedence` field controls evaluation order when multiple policies match (`0` means this policy is evaluated first).  
Create a Zero Trust Gateway rule  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "Block security threats",  
    "description": "Block all default Cloudflare DNS security categories",  
    "precedence": 0,  
    "enabled": true,  
    "action": "block",  
    "filters": [  
        "dns"  
    ],  
    "traffic": "any(dns.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})",  
    "identity": ""  
  }'  
```  
```  
{  
   "success": true,  
   "errors": [],  
   "messages": []  
}  
```  
The API will respond with a summary of the policy and the result of your request.

For more information, refer to [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/).

## 4\. Add optional policies

Once your first policy is active, refer to [common DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/common-policies) for other policies you may want to add. Common additions include blocking specific content categories (such as social media or streaming), enabling SafeSearch on search engines, and restricting DNS queries so devices can only use resolvers that you have approved.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/dns/#page","headline":"Set up DNS filtering · Cloudflare One docs","description":"DNS filtering in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/dns/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/get-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/get-started/dns/","name":"DNS filtering"}}]}
```
