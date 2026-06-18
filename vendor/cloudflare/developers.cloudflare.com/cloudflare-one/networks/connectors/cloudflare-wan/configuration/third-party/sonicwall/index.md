---
title: SonicWall
description: Integrate SonicWall with Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SonicWall

This tutorial shows you how to use Cloudflare WAN (formerly Magic WAN) with the following versions of the SonicWall appliances:

* **Hardware tested**:  
   * SonicWall NSv 470  
   * SonicWall 3700
* **Software versions tested**:  
   * SonicOS 7.0.1

You can connect your SonicWall appliance through [IPsec tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/) to Cloudflare WAN. Generic Routing Encapsulation (GRE) is not supported on SonicWall.

## Topology

![Topology diagram showing how to connect SonicWall appliances to Cloudflare WAN](https://developers.cloudflare.com/_astro/topology.Qe7r1Gcs_1503hh.webp) 

_Note: Labels in this image may reflect previous product names._

The following instructions show how to set up an IPsec connection on your SonicWall device. We will use the IP ranges from the above topology example to create the connections needed. Settings not explicitly mentioned can be left with their default values.

## 1\. Create an IPsec tunnel on your Cloudflare account

1. Start by [creating your IPsec tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/#add-tunnels) on Cloudflare. Name and describe the tunnels as needed, and add the following settings:  
   * **Interface address**: Enter the internal tunnel IP on the Cloudflare side of the IPsec tunnel. In this example, it is `10.200.1.0/31`.  
   * **Customer endpoint**: Enter the WAN IP address of your SonicWall device. In our example, this is `198.51.100.2`.  
   * **Cloudflare endpoint**: Enter one of the Cloudflare anycast IP addresses assigned to your account, available in [Leased IPs ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space). In our example, this is `1.2.3.4`.  
   * **Pre-shared key**: Select **Use my own pre-shared key** and paste a secure key of your own.
2. Select **Add tunnels** when you are finished.
3. After you create your tunnel, Cloudflare dashboard will load a list of tunnels set up for your account. Select the arrow to expand the tunnels you have just created, and check the following settings:  
   * **Customer endpoint**: Refers to the SonicWall WAN IP that the VPN policy is bound to (in red).  
   * **Cloudflare endpoint**: Refers to the Cloudflare anycast IP address (in blue).  
   * **FQDN ID**: The ID used in the VPN policy for the SonicWall's Local IKE ID. Copy this ID and save it. You will need it when configuring the tunnel on your SonicWall (in green).  
![An example of what your IPsec tunnel should look like](https://developers.cloudflare.com/_astro/step3.BQqYLGGy_2mLb4y.webp)

Note

The interface address on the Cloudflare side of the tunnel is `10.200.1.0/31`. You will need to use `10.200.1.1/31` on the SonicWall side of the tunnel.

## 2\. Create static routes on Cloudflare dashboard

Static routes are required for any networks that will be reached via the IPsec tunnel. In our example, there are two networks: `172.31.3.0/24` and the tunnel network `10.200.1.0/31`.

1. [Create your static routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-routes/#create-a-static-route). Name and describe them as needed, and add the following settings:  
   * **First tunnel**: Following our example, add `10.200.1.0/31` as the **Prefix** and `10.200.1.1` for the **Tunnel/Next hop**.  
   * **Second tunnel**: Following our example, add `172.31.3.0/24` as the **Prefix** and `10.200.1.1` for the **Tunnel/Next hop**.
2. Select **Add routes** when you are finished.

## 3\. Add a VPN configuration in SonicWall

1. Go to **Network** \> **IPsec VPN** \> **Rules and Settings**.
2. Select **Add**.
3. In **General** \> **Security Policy** group, add the following settings:  
   * **Authentication Method**: _IKE Using Preshared Secret_.  
   * **IPsec Primary Gateway Name or Address**: Enter Cloudflare's anycast IP address for the primary gateway (in blue).
4. In the **IKE Authentication** group, add the following settings:  
   * **Shared secret**: Paste the pre-shared key you use to create the IPsec tunnel in step 1 (in purple).  
   * **Local IKE ID**: Select _Domain name_ from the drop-down menu, and paste here the **FQDN ID** you saved from step 1, after creating the IPsec tunnel (in green).  
   * **Peer IKE IDE**: Select _IPv4_ Address from the drop-down menu, and enter the Cloudflare anycast IP address (in blue).

![Configure a VPN policy on your SonicWall device](https://developers.cloudflare.com/_astro/3-vpn-config.D7Z_hEIs_10weGa.webp)

1. Select **Proposals**. VPN Policy is somewhat flexible. Adjust these settings to match your organization's preferred security policy. As an example, you can use the settings in the examples below.
2. In the **IKE (Phase 1) Proposal** group, select the following settings:  
   * **Exchange**: _IKEv2 Mode_  
   * **DH Group**: _Group 20_  
   * **Encryption**: _AES-256_  
   * **Authentication**: _SHA256_  
   * **Life Time (seconds)**: `86400`
3. In the **IPsec (Phase 2) Proposal** group, add the following settings:  
   * **Protocol**: _ESP_  
   * **Encryption**: _AESGCM16-256_  
   * **Authentication**: _None_  
   * **Enable Perfect Forward Secrecy**: Enabled  
   * **DH Group**: _Group 20_  
   * **Life Time (seconds)**: `28800`
4. Select **Advanced**.
5. Enable **Disable IPsec Anti-Replay**.
6. In **VPN Policy bound to** select your WAN interface from the drop-down menu, to bind it to your VPN.
7. Select **Save**.

![Enable anti-replay on your SonicWall device](https://developers.cloudflare.com/_astro/5-anti-replay.Dth4Gt_P_Z2gygj4.webp)

## 4\. Add a VPN tunnel interface

SonicOS requires a VPN tunnel interface to route traffic via Cloudflare WAN. When creating the interface, use the prefix `10.200.1.1/31`. This matches with the Cloudflare side for this tunnel, which is `10.200.1.0`.

Note

You will need to use a different IP pair for each tunnel/site.

1. Go to **Network** \> **System** \> **Interfaces**.
2. Select **Add interface** \> **VPN Tunnel Interface**.
3. For IP Address, use `10.200.1.1`.
4. Enable **Ping**. This is required so the interface can be pinged for debugging and Cloudflare WAN health checks.

![Enable ping so that your interface can be pinged for debugging and Cloudflare WAN health checks](https://developers.cloudflare.com/_astro/6-vpn-ping.C-1HHDpJ_nDsYq.webp)

1. Select **Advanced**.
2. Enable the **Enable Asymmetric Route Support** option. This is required for the IPsec tunnel health check.

![Enable Asymmetric Route Support. It is required for Cloudflare WAN health checks](https://developers.cloudflare.com/_astro/6-vpn-assymetric.z4MOIOv3_2x5GDP.webp)

1. Select **OK**.

## 5\. Add address object(s)

Address objects are necessary for route policies. In our example, we have one other site that will be reached via Cloudflare WAN. First, you need to create address objects for each network. Then, you need to create an address group that contains all the remote networks. This address group will be used in the next step to create the correct route policies.

To add an address object:

1. Select **Object** \> **Match Objects** \> **Addresses**.
2. Select **Address Objects** \> **Add**.
3. Enter the information for your address object - refer to the topology image for the examples this tutorial is using. Since the addresses are in the VPN zone, set the **Zone Assignment** for the object to _VPN_.
4. Select **Save**. The window will stay on to facilitate multiple entries. Select **X** to close it.

![Enter the appropriate settings for your object](https://developers.cloudflare.com/_astro/7-address-objects-settings.Dym3UpvD_1yvHEh.webp)

1. Select **Address Groups** \> **Add** to add a new address group.
2. Enter a **Name** for your address group.
3. Select the individual network objects you have created on the left menu, and add them to the group by selecting the right-facing arrow in the middle column.
4. Select **Save**.

![Copy the individual network objects and add them to your group](https://developers.cloudflare.com/_astro/7-add-objects-group.CYauQpR7_Z1PirkU.webp)

## 6\. Set up routing

Add a route using the address object or group just created as the destination.

1. Select **Policy** \> **Rules and Policies** \> **Routing Rules**.
2. Select **Add** to add your route policy.
3. The **Next Hop** should be the VPN tunnel interface that was previously created in the interface panel.

## 7\. Add access rule for health checks

An additional access rule is required for Cloudflare WAN health checks to work properly. This will enable the WAN IP to receive ICMP pings via the tunnel, and return them over the WAN.

1. Select **Policy** \> **Rules and Policies**.
2. Select **Access Rules** \> **Add**.
3. Enter a descriptive name for your policy.
4. In **Source / Destination** \> **Destination > Port/Services**, select _ICMP_ from the drop-down menu.
5. Select **Optional Settings**.
6. In **Others**, enable **Allow Management traffic**.

## 8\. Setup health checks

You have to [configure Cloudflare WAN health checks](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/#add-tunnels) correctly. Here is an example of how to set up health checks:

Terminal window

```

curl --request PUT \

https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/ipsec_tunnels/{tunnel_id} \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "health_check": {

    "direction": "bidirectional",

    "enabled": true,

    "type": "request",

    "rate": "low"

  }

}'


```

Health checks might take some time to stabilize after the configuration is changed.

## 9\. Verify tunnel status on Cloudflare dashboard

The Cloudflare dashboard monitors the health of all anycast tunnels on your account that route traffic from Cloudflare to your origin network. Refer to [Check tunnel health in the dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/check-tunnel-health-dashboard/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/sonicwall/#page","headline":"SonicWall · Cloudflare One docs","description":"Integrate SonicWall with Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/sonicwall/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPsec"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/","name":"Third-party integration"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/sonicwall/","name":"SonicWall"}}]}
```
