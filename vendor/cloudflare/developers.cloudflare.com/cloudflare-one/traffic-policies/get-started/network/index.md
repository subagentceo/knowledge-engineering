---
title: Network filtering
description: Network filtering in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network filtering

Secure Web Gateway allows you to apply policies at the network level to control which websites and non-HTTP applications users can access. This is useful when you need to control traffic that is not web browsing — for example, blocking remote desktop connections or restricting file-transfer tools across your organization.

Network policies inspect individual TCP and UDP packets (the low-level data units that carry all Internet traffic), which means you can filter traffic that [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/dns/) and [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/) policies cannot reach. DNS policies only see domain lookups, and HTTP policies only see web requests — network policies go deeper and can catch protocols like SSH (remote terminal access), RDP (remote desktop), and custom applications running on non-standard ports.

Note

For a more detailed guide to filtering network traffic and more for your organization, refer to the [Secure your Internet traffic and SaaS apps](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/concepts/) implementation guide.

## 1\. Connect to Gateway

### Connect devices

To filter network traffic from a device such as a laptop or phone:

1. [Install the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on your device.
2. In the Cloudflare One Client Settings, log in to your organization's Cloudflare One instance.
3. (Optional) If you want to display a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/) when users are blocked, [install the Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on your device. Without the certificate, blocked users will see a generic browser connection error instead of an informative page.
4. [Enable the Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#turn-on-the-gateway-proxy) for TCP. The Gateway proxy is what routes your device's traffic through Cloudflare so network policies can inspect it — without it enabled, your policies will have no effect. Optionally, enable the UDP proxy to also inspect QUIC traffic (a newer protocol used by HTTP/3 connections) on port 443.

### Connect private networks

To filter traffic from private networks (internal corporate networks not exposed to the public Internet), refer to the [Cloudflare Tunnel guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

## 2\. Verify device connectivity

Verifying connectivity ensures that traffic from your device is actually flowing through Cloudflare before you build policies against it.

To verify your device is connected to Cloudflare One:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. Under **Log traffic activity**, enable activity logging for all Network logs. This tells Cloudflare to record network-level traffic so you can confirm your device appears in the logs.
3. On your Cloudflare One Client device, open a browser and visit any website. This generates traffic that should appear in the logs.
4. Determine the **Source IP** for your device (the public-facing address Cloudflare sees for your connection):

* [ Version 2026.2+ ](#tab-panel-7610)
* [ Version 2026.1 and earlier ](#tab-panel-7611)

1. Open the Cloudflare One Client.
2. Go to **Profile**.
3. Note the **Client Interface IP**. This is the same address that will appear as the Source IP in your network logs.

1. Open the Cloudflare One Client.
2. Go to **Settings** (gear icon) **Preferences** \> **General**.
3. Note the **Public IP**. This is the same address that will appear as the Source IP in your network logs.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs** \> **Network logs**. Before building network policies, make sure you see network logs from the Source IP assigned to your device.

If no logs appear after a few minutes, check two things: first, verify that the [Gateway proxy is turned on](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#turn-on-the-gateway-proxy). Second, confirm that the device is enrolled in your Zero Trust organization by checking the Cloudflare One Client connection status.

## 3\. Create your first network policy

A network policy has two parts: a matcher that selects which traffic to act on (for example, all packets destined for port 22, the default port for SSH) and an action that decides what to do with it (for example, block the connection).

To create a new network policy:

* [ Dashboard ](#tab-panel-7612)
* [ API ](#tab-panel-7613)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**.
2. In the **Network** tab, select **Add a network policy**.
3. Name the policy.
4. Under **Traffic**, build a logical expression that defines the traffic you want to allow or block.
5. Choose an **Action** to take when traffic matches the logical expression. For example, you can use a list of [device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/) to ensure users can only access an application if they connect with the Cloudflare One Client from a company device:  
| Selector                     | Operator | Value                   | Logic | Action |  
| ---------------------------- | -------- | ----------------------- | ----- | ------ |  
| SNI Domain                   | is       | internalapp.com         | And   | Block  |  
| Passed Device Posture Checks | not in   | _Device serial numbers_ |       |        |
6. Select **Create policy**.

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
| Type    | Item       | Permission |  
| ------- | ---------- | ---------- |  
| Account | Zero Trust | Edit       |
2. (Optional) Configure your API environment variables to include your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and API token.
3. Send a `POST` request to the [Create a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/create/) endpoint. For example, you can use a list of [device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/) to ensure users can only access an application if they connect with the Cloudflare One Client from a company device:  
Create a Zero Trust Gateway rule  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "Enforce device posture",  
    "description": "Ensure only devices in Zero Trust organization can connect to application",  
    "precedence": 0,  
    "enabled": true,  
    "action": "block",  
    "filters": [  
        "l4"  
    ],  
    "traffic": "any(net.sni.domains[*] == \"internalapp.com\")",  
    "identity": "",  
    "device_posture": "not(any(device_posture.checks.passed[*] in {\"LIST_UUID\"}))"  
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

For more information, refer to [network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/).

## 4\. Add optional policies

Refer to our list of [common network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/common-policies) for policies you may want to create. Common additions include blocking traffic to specific IP ranges, restricting access to non-standard ports (ports other than well-known ones like 80 for HTTP and 443 for HTTPS), and using protocol detection to identify applications like BitTorrent based on their traffic patterns rather than port numbers alone.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/network/#page","headline":"Set up network filtering · Cloudflare One docs","description":"Network filtering in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/network/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH","RDP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/get-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/get-started/network/","name":"Network filtering"}}]}
```
