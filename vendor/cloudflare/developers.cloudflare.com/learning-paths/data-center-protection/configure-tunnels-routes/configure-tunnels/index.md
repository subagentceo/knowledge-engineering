---
title: Configure tunnels
description: Create GRE or IPsec tunnels for Magic Transit.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure tunnels

Cloudflare assigns an IPv4 anycast address to your account for use as the tunnel destination for your network's routers. You can find this address in the Cloudflare dashboard under **Address Space** \> [**Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space). To request additional endpoint addresses, contact your account team.

Cloudflare handles failures on its network automatically by advertising your endpoint IP from multiple nodes across many globally distributed data centers. To handle failures on your network, configure two tunnels from separate routers.

## Before you begin

Before creating a tunnel, make sure you have the following information:

* **Cloudflare endpoint address**: The anycast IP address assigned to your account. You can find it in the Cloudflare dashboard under **Address Space** \> [**Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).
* **Customer endpoint IP**: A public Internet routable IP address outside of the prefixes Cloudflare will advertise on your behalf (typically provided by your ISP). Not required if using [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/) or for IPsec tunnels (unless your router uses an IKE ID of type `ID_IPV4_ADDR`).
* **Interface address**: A `/31` (recommended) or `/30` subnet from RFC 1918 private IP space (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) or `169.254.240.0/20`.

Warning

Make sure the interface address prefixes are always within the allowed Cloudflare ranges, especially for cloud service providers that might automatically generate prefixes for you. Otherwise, the tunnel will not work.

## Ways to onboard traffic to Cloudflare

### GRE and IPsec tunnels

You can use GRE or IPsec tunnels to onboard your traffic to Magic Transit, and set them up through the Cloudflare dashboard or the API. If you use the API, you need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API key](https://developers.cloudflare.com/fundamentals/api/get-started/keys/#view-your-global-api-key).

Anycast routing

Cloudflare uses anycast to route traffic. Anycast is a network addressing and routing method that routes incoming requests to different locations. Traffic can arrive at a different geographic location than expected. Not all requests go to the closest data center because Internet routing and peering relationships are complex, and Cloudflare optimizes for performance and reliability.

#### Choose between GRE and IPsec

| Feature          | GRE                               | IPsec                                            |
| ---------------- | --------------------------------- | ------------------------------------------------ |
| Encryption       | No                                | Yes                                              |
| Authentication   | No                                | Pre-shared key (PSK)                             |
| Setup complexity | Simpler                           | Requires PSK exchange                            |
| Best for         | Trusted networks, CNI connections | Internet-facing connections requiring encryption |

Refer to [Tunnels and encapsulation](https://developers.cloudflare.com/magic-transit/reference/gre-ipsec-tunnels/) to learn more about the technical requirements for both tunnel types.

#### IPsec supported ciphers

Refer to [supported ciphers for IPsec](https://developers.cloudflare.com/magic-transit/reference/gre-ipsec-tunnels/#supported-configuration-parameters) for a complete list. IPsec tunnels only support Internet Key Exchange version 2 (IKEv2).

#### Anti-replay protection

If you use Magic Transit and anycast IPsec tunnels, we recommend disabling anti-replay protection. Cloudflare disables this setting by default. However, you can enable it through the API or the Cloudflare dashboard for devices that do not support disabling it, including Cisco Meraki, Velocloud, and AWS VPN Gateway.

Refer to [Anti-replay protection](https://developers.cloudflare.com/magic-transit/reference/anti-replay-protection/) for more information on this topic, or [Add IPsec tunnels](#add-ipsec-tunnel) to learn how to enable this feature.

### Network Interconnect (CNI)

Beyond GRE and IPsec tunnels, you can also use Network Interconnect (CNI) to onboard your traffic to Magic Transit. Refer to [Network Interconnect (CNI)](https://developers.cloudflare.com/magic-transit/network-interconnect/) for more information.

## Add tunnels

Warning

Cloudflare Network Firewall rules apply to Internet Control Message Protocol (ICMP) traffic. If you enable Cloudflare Network Firewall, ensure your rules allow ICMP traffic sourced from Cloudflare public IPs. Otherwise, health checks will fail. Refer to [Cloudflare Network Firewall rules](https://developers.cloudflare.com/cloudflare-network-firewall/about/ruleset-logic/#cloudflare-network-firewall-rules-and-magic-transit-endpoint-health-checks) for more information.

* [ Dashboard ](#tab-panel-9051)
* [ API ](#tab-panel-9052)

1. Go to **Connectors** page.
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. From the **IPsec/GRE tunnels** tab, select **Create a tunnel**.
2. On the **Add tunnels** page, choose either a **GRE tunnel** or **IPsec tunnel**.
1. In **Name**, give your tunnel a descriptive name. This name must be unique, cannot contain spaces or special characters, and cannot be shared with other tunnels.
2. _(Optional)_ Give your tunnel a description in **Description**.
3. In **IPv4 Interface address**, enter the internal IP address for your tunnel along with the interface's prefix length (`/31` or `/30`). This is used to route traffic through the tunnel on the Cloudflare side. We recommend using a `/31` subnet, as it provides the most efficient use of IP address space.

Expand the section below for your tunnel type to complete the configuration:

GRE tunnel

1. In **Customer GRE endpoint**, enter your router's public IP address. You do not need this value if you use a physical or virtual connection like Cloudflare Network Interconnect because Cloudflare provides it.
2. In **Cloudflare GRE endpoint**, enter one of the anycast addresses assigned to your account. You can find them in [Leased IPs ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).
3. _(Optional)_ Leave the default values for **TTL** and **MTU**, or customize them for your network.
4. _(Optional)_ Configure health check settings. Expand the following to learn more about each option:  
Health check options  
   * **Tunnel health checks**: Enabled by default. If you disable tunnel health checks, your tunnels appear 100% down in your [tunnel health dashboard](https://developers.cloudflare.com/magic-transit/network-health/check-tunnel-health-dashboard/) even when working. Cloudflare keeps sending traffic through the tunnel without the means to detect if the tunnel goes down. You must set up your own system to detect down tunnels, as Cloudflare cannot warn you about down tunnels. Refer to [Tunnel health checks](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/) for more information.  
   * **Health check rate**: If you keep tunnel health checks enabled, choose a [health check rate](https://developers.cloudflare.com/magic-transit/network-health/update-tunnel-health-checks-frequency/) for your tunnel. Available options are _Low_, _Medium_, and _High_.  
   * **Health check type**: Defaults to _Reply_ and to creating an ICMP (Internet Control Message Protocol) reply. If your firewall drops this type of packet because it assumes the packet is an attack, change this option to _Request_ which creates an ICMP request. Refer to [Tunnel health checks](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/) for more information.  
   * **Health check direction**: Defaults to **unidirectional** for Magic Transit. Refer to [Bidirectional vs unidirectional health checks](#bidirectional-vs-unidirectional-health-checks) for more details.  
   * **Health check target**: The customer end of the tunnel. This field is only visible when **Health check direction** is set to _Unidirectional_.
5. _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, select **Test tunnels**.
1. To add multiple tunnels, select **Add GRE tunnel** for each new tunnel.
1. After adding your tunnel information, select **Add tunnels**.
1. (_Optional_) Select **Allow BGP (Border Gateway Protocol) peering** (beta) if you want to dynamically exchange routes between your network and Cloudflare. This feature requires [Unified Routing (beta)](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/#unified-routing-mode-beta).  
 BGP is recommended for environments with frequently changing routes or when you need automatic failover. Refer to [Configure BGP routes](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes) for more information.

IPsec tunnel

1. _(Optional)_ In **Customer endpoint**, enter your router's public IP address. This value is only required if your router uses an IKE ID of type `ID_IPV4_ADDR`.
2. In **Cloudflare endpoint**, enter one of the anycast addresses assigned to your account. You can find them in [Leased IPs ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).
3. _(Optional)_ Configure health check settings. Expand the following to learn more about each option:  
Health check options  
   * **Tunnel health checks**: Enabled by default. If you disable tunnel health checks, your tunnels appear 100% down in your [tunnel health dashboard](https://developers.cloudflare.com/magic-transit/network-health/check-tunnel-health-dashboard/) even when working. Cloudflare keeps sending traffic through the tunnel without the means to detect if the tunnel goes down. You must set up your own system to detect down tunnels, as Cloudflare cannot warn you about down tunnels. Refer to [Tunnel health checks](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/) for more information.  
   * **Health check rate**: If you keep tunnel health checks enabled, choose a [health check rate](https://developers.cloudflare.com/magic-transit/network-health/update-tunnel-health-checks-frequency/) for your tunnel. Available options are _Low_, _Medium_, and _High_.  
   * **Health check type**: Defaults to _Reply_ and to creating an ICMP (Internet Control Message Protocol) reply. If your firewall drops this type of packet because it assumes the packet is an attack, change this option to _Request_ which creates an ICMP request. Refer to [Tunnel health checks](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/) for more information.  
   * **Health check direction**: Defaults to **unidirectional** for Magic Transit. Refer to [Bidirectional vs unidirectional health checks](#bidirectional-vs-unidirectional-health-checks) for more details.  
   * **Health check target**: The customer end of the tunnel. This field is only visible when **Health check direction** is set to _Unidirectional_.  
Note  
IPsec tunnels will not function without a pre-shared key (PSK).
4. If you do not have a pre-shared key yet:  
   1. Select **Add pre-shared key later**.  
   2. _(Optional)_ We recommend you test your tunnel configuration before officially adding it. To test the tunnel, select **Test tunnels**.  
   3. Select **Add tunnels**.  
   4. The Cloudflare dashboard loads the list of tunnels you have configured. The IPsec tunnel you just created displays a warning triangle icon to indicate it is not yet functional. Select **Edit**.  
   5. Choose **Generate a new pre-shared key** \> **Update and generate a pre-shared key**. Save the key to a safe place, and select **Done**.
5. If you already have a pre-shared key:  
   1. Select **Use my own pre-shared key**.  
   2. Paste your key in **Your pre-shared key**.  
   3. _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, select **Test tunnels**.  
   4. Select **Add tunnels**.
6. _(Optional)_ Enable **Replay protection** if you have devices that do not support disabling it. Refer to [Anti-replay protection](https://developers.cloudflare.com/magic-transit/reference/anti-replay-protection/) for more information.
1. To add multiple tunnels, select **Add IPsec tunnel** for each new tunnel.
1. After adding your tunnel information, select **Add tunnels**.
1. (_Optional_) Select **Allow BGP (Border Gateway Protocol) peering** (beta) if you want to dynamically exchange routes between your network and Cloudflare. This feature requires [Unified Routing (beta)](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/#unified-routing-mode-beta).  
 BGP is recommended for environments with frequently changing routes or when you need automatic failover. Refer to [Configure BGP routes](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes) for more information.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

GRE tunnel

Create a `POST` request [using the API](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/gre%5Ftunnels/methods/create/) to create a GRE tunnel.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic WAN Write`
* `Magic Transit Write`

Create a GRE tunnel

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/gre_tunnels" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "<TUNNEL_NAME>",

    "description": "<TUNNEL_DESCRIPTION>",

    "interface_address": "<INTERFACE_ADDRESS>",

    "cloudflare_gre_endpoint": "<CLOUDFLARE_ENDPOINT>",

    "customer_gre_endpoint": "<CUSTOMER_ENDPOINT>"

  }'


```

```

{

  "errors": [

    {

      "code": 1000,

      "message": "message"

    }

  ],

  "messages": [

    {

      "code": 1000,

      "message": "message"

    }

  ],

  "result": {

    "gre_tunnels": [

      {

        "cloudflare_gre_endpoint": "<IP_ADDRESS>",

        "customer_gre_endpoint": "<IP_ADDRESS>",

        "interface_address": "<INTERFACE_CIDR>",

        "name": "<TUNNEL_NAME>",

        "description": "<TUNNEL_DESCRIPTION>",

        "health_check": {

          "direction": "unidirectional",

          "enabled": true,

          "rate": "low",

          "type": "reply"

        },

        "mtu": 0,

        "ttl": 0

      }

    ]

  },

  "success": true

}


```

IPsec tunnel

1. Create a `POST` request [using the API](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/ipsec%5Ftunnels/methods/create/) to create an IPsec tunnel.  
Note that in the example, replay protection is disabled by default. You can enable it with the flag `"replay_protection": true` for each IPsec tunnel, if the devices you use do not support disabling this feature. If you have already created IPsec tunnels, update them with a [PUT request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/ipsec%5Ftunnels/methods/update/). Refer to [Anti-replay protection](https://developers.cloudflare.com/magic-transit/reference/anti-replay-protection/) for more information on this topic.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic WAN Write`  
   * `Magic Transit Write`  
Create an IPsec tunnel  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "<TUNNEL_NAME>",  
    "description": "<TUNNEL_DESCRIPTION>",  
    "interface_address": "<INTERFACE_ADDRESS>",  
    "cloudflare_endpoint": "<CLOUDFLARE_ENDPOINT>",  
    "customer_endpoint": "<CUSTOMER_ENDPOINT>"  
  }'  
```  
```  
{  
  "errors": [  
    {  
      "code": 1000,  
      "message": "message"  
    }  
  ],  
  "messages": [  
    {  
      "code": 1000,  
      "message": "message"  
    }  
  ],  
  "result": {  
    "ipsec_tunnels": [  
      {  
        "id": "<IPSEC_TUNNEL_ID>",  
        "interface_address": "<INTERFACE_CIDR>",  
        "name": "<TUNNEL_NAME>",  
        "cloudflare_endpoint": "<IP_ADDRESS>",  
        "customer_endpoint": "<IP_ADDRESS>",  
        "description": "<TUNNEL_DESCRIPTION>",  
        "health_check": {  
          "direction": "unidirectional",  
          "enabled": true,  
          "rate": "low",  
          "type": "reply"  
        },  
        "psk_metadata": {},  
        "replay_protection": false  
      }  
    ]  
  },  
  "success": true  
}  
```  
Take note of the tunnel `id` value. We will use it to generate a pre-shared key (PSK).
2. Create a `POST` [request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/ipsec%5Ftunnels/methods/psk%5Fgenerate/) to generate a PSK. Use the tunnel `id` value you received from the previous command.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic WAN Write`  
   * `Magic Transit Write`  
Generate Pre Shared Key (PSK) for IPsec tunnels  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/$IPSEC_TUNNEL_ID/psk_generate" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
{  
  "result": {  
    "ipsec_id": "<IPSEC_ID>",  
    "ipsec_tunnel_id": "<IPSEC_TUNNEL_ID>",  
    "psk": "<PSK_CODE>",  
    "psk_metadata": {  
      "last_generated_on": "2025-03-13T14:28:47.054317925Z"  
    }  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```  
Take note of your `psk` value.
3. Create a `PUT` [request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/ipsec%5Ftunnels/methods/update/) to update your IPsec tunnel with the PSK.  
Terminal window  
```  
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/magic/ipsec_tunnels/%7Bipsec_tunnel_id%7D" \  
  --request PUT \  
  --json '{  
    "psk": "<PSK_VALUE>"  
  }'  
```

```

{

  "result": {

    "modified": true,

    "modified_ipsec_tunnel": {

      "id": "<IPSEC_ID>",

      "interface_address": "<IPSEC_CIDR>",

      "created_on": "2025-03-13T14:28:21.139535Z",

      "modified_on": "2025-03-13T14:33:26.09683Z",

      "name": "<TUNNEL_NAME>",

      "cloudflare_endpoint": "<IP_ADDRESS>",

      "customer_endpoint": "<IP_ADDRESS>",

      "remote_identities": {

        "hex_id": "",

        "fqdn_id": "",

        "user_id": ""

      },

      "psk_metadata": {

        "last_generated_on": "2025-03-13T14:28:47.054318Z"

      },

      "description": "<TUNNEL_DESCRIPTION>",

      "health_check": {

        "enabled": true,

        "target": "",

        "type": "reply",

        "rate": "mid",

        "direction": "unidirectional"

      }

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

1. Use the `psk` value from step 3 to configure the IPsec tunnel on your equipment as well.

Configure bidirectional health checks

Bidirectional health checks are available for GRE and IPsec tunnels. For Magic Transit this option defaults to unidirectional.

You can change this setting via the API with `"bidirectional"` or `"unidirectional"`:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/magic/ipsec_tunnels/%7Bipsec_tunnel_id%7D" \

  --request PUT \

  --json '{

    "health_check": {

        "direction": "bidirectional"

    }

  }'


```

```

{

  "result": {

    "modified": true,

    "modified_ipsec_tunnel": {

      "id": "<IPSEC_ID>",

      "interface_address": "<IPSEC_CIDR>",

      "created_on": "2025-03-13T14:28:21.139535Z",

      "modified_on": "2025-03-13T14:33:26.09683Z",

      "name": "<TUNNEL_NAME>",

      "cloudflare_endpoint": "<IP_ADDRESS>",

      "customer_endpoint": "<IP_ADDRESS>",

      "remote_identities": {

        "hex_id": "",

        "fqdn_id": "",

        "user_id": ""

      },

      "psk_metadata": {

        "last_generated_on": "2025-03-13T14:28:47.054318Z"

      },

      "description": "<TUNNEL_DESCRIPTION>",

      "health_check": {

        "enabled": true,

        "target": "",

        "type": "reply",

        "rate": "mid",

        "direction": "bidirectional"

      }

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## Bidirectional vs unidirectional health checks

To check for tunnel health, Cloudflare sends a [health check probe](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/) consisting of ICMP (Internet Control Message Protocol) reply [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) to your network. Cloudflare needs to receive these probes to know if your tunnel is healthy.

Cloudflare defaults to unidirectional health checks for Magic Transit (direct server return), and bidirectional health checks for Cloudflare WAN. However, routing unidirectional ICMP reply packets over the Internet to Cloudflare is sometimes subject to drops by intermediate network devices, such as stateful firewalls. Magic Transit customers with egress traffic can modify this setting to bidirectional.

If you are a Magic Transit customer with egress traffic, refer to [Magic Transit egress traffic](https://developers.cloudflare.com/magic-transit/reference/egress/) for more information on the technical aspects you need to consider to create a successful connection to Cloudflare.

### Legacy bidirectional health checks

For customers using the legacy health check system with a public IP range, Cloudflare recommends:

* Configuring the tunnel health check target IP address to one within the `172.64.240.252/30` prefix range.
* Applying a policy-based route that matches [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) with a source IP address equal to the configured tunnel health check target (for example `172.64.240.253/32`), and route them over the tunnel back to Cloudflare.

## Next steps

Now that you have set up your tunnel endpoints, you need to configure routes to direct your traffic through Cloudflare. You have two routing options:

* **Static routes**: Best for simple, stable networks where routes rarely change. You manually define each route.
* **BGP peering**: Best for dynamic environments with frequently changing routes, multiple prefixes, or when you need automatic failover. Requires enabling BGP on your tunnel during creation.

Refer to [Configure routes](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/) for detailed instructions on both options.

## Troubleshooting

If you experience issues with your tunnels:

* For tunnel health check problems, refer to [Troubleshoot tunnel health](https://developers.cloudflare.com/magic-transit/troubleshooting/tunnel-health/).
* For IPsec tunnel establishment issues, refer to [Troubleshoot with IPsec logs](https://developers.cloudflare.com/magic-transit/troubleshooting/ipsec-troubleshoot/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/configure-tunnels-routes/configure-tunnels/#page","headline":"Configure tunnels · Cloudflare Learning Paths","description":"Create GRE or IPsec tunnels for Magic Transit.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/configure-tunnels-routes/configure-tunnels/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/data-center-protection/configure-tunnels-routes/","name":"Configure tunnels and routes"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/data-center-protection/configure-tunnels-routes/configure-tunnels/","name":"Configure tunnels"}}]}
```
