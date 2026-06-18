---
title: Aruba EdgeConnect Enterprise
description: Integrate Aruba EdgeConnect Enterprise with Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Aruba EdgeConnect Enterprise

Cloudflare partners with Aruba's EdgeConnect SD-WAN solution to provide users with an integrated solution. The EdgeConnect appliances manage subnets associated with branch offices or retail locations. Anycast tunnels are set up between the EdgeConnect appliances and Cloudflare to securely route traffic.

This tutorial describes how to configure the EdgeConnect device for both east-west (branch to branch) and north-south (Internet-bound) use cases.

Warning

Note that north-south traffic routed through Cloudflare's Secure Web Gateway is an optional add-on feature set and requires a Cloudflare Zero Trust account.

### Prerequisites

Before setting up a connection between EdgeConnect and Cloudflare, you must have:

* A contract that includes Cloudflare WAN (formerly Magic WAN) and Secure Web Gateway.
* Received two Cloudflare endpoints (anycast IP addresses), available in [Leased IPs ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).
* Determined a private static /31 IP pair to use with each tunnel. The /31 pairs should be from a different private subnet, separate from the private subnets used behind each EdgeConnect appliance.
* The EdgeConnect devices used in this tutorial and on v9.0.

## Example scenario

GRE tunnel configuration

For the purpose of this tutorial, the integration will refer to a scenario with two branch offices, each with distinct subnets.

There are 2 branch offices each with distinct subnets.

* The east branch office has a `10.3.0.0/16` network with an EdgeConnect terminating the anycast GRE tunnel.
* The west branch office has a `10.30.0.0/16` network with an EdgeConnect terminating the anycast GRE tunnel.

![Table of branch subnet information](https://developers.cloudflare.com/_astro/branch-subnets.DXU4G0d8_Z1FO83x.webp)

_Note: Labels in this image may reflect a previous product name._

The following example shows the **east\_branch** deployment on the Orchestrator.

![GCP East deployment configuration](https://developers.cloudflare.com/_astro/east-branch-deployment.C2wtem9-_Z1bNo59.webp)

The Deployment screenshot displays several different IP addresses and interfaces. From left to right:

* **Next Hop 10.3.0.1** \- This example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP.
* **IP/Mask (LAN) 10.3.0.2/24** \- This defines the LAN0 interface IP of the EdgeConnect appliance.
* **IP/Mask (WAN) 10.2.0.2/24** \- This defines the WAN0 interface IP of the EdgeConnect appliance.
* **Next Hop 10.2.0.1** \- This example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP.

IPsec tunnel configuration

For the purpose of this tutorial, the integration will refer to a scenario with two branch offices, each with distinct subnets.

The central branch office has a `10.22.0.0/24` network with an EdgeConnect terminating the anycast IPsec tunnel.

The west branch office has a `10.77.0.0/24` network with an EdgeConnect terminating the anycast IPsec tunnel.

![IPsec tunnel values for east and west branches](https://developers.cloudflare.com/_astro/central-west-branch-ipsec.CsmmyLAQ_Z1VfNkH.webp)

_Note: Labels in this image may reflect a previous product name._

The following example shows the **central\_branch** deployment on the Orchestrator.

![Values for central branch configuration within Orchestrator](https://developers.cloudflare.com/_astro/orchestrator-ipsec.BroLLE2X_Zrg4dc.webp)

The Deployment screenshot displays several different IP addresses and interfaces. From left to right:

* **Next Hop 10.22.0.1** \- This example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP.
* **IP/Mask (LAN) 10.22.0.2/24** \- This defines the LAN0 interface IP of the EdgeConnect appliance.
* **IP/Mask (WAN) 10.32.0.2/24** \- This defines the WAN0 interface IP of the EdgeConnect appliance.
* **Next Hop 10.32.0.1** \- This example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP.

## 1\. Define a common site on the Orchestrator

For all EdgeConnect devices using Cloudflare, modify the devices to put them on the same site. This disables automatic IPsec tunnel creation between the EdgeConnect devices using the same labels for the WAN interfaces in use.

This step is only required if Cloudflare is used for east-west traffic routing.

## 2\. Configure overlay policies

Aruba Orchestrator's Business Intent Overlays create intuitive policies which automatically identify and steer application traffic to Cloudflare. This example creates two Business Intent Overlay (BIO) policies.

GRE tunnel configuration

Cloudflare's [tunnel health checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/tunnel-health-checks/) are ping reply packets encapsulated in GRE packets. The source IP is the EdgeConnect WAN interface used to establish a tunnel, and the destination IP is Cloudflare servers. These packets need to be sent directly from the WAN interface and not through the established tunnels.

To create the overlay policy:

1. Create a compound application, which is a combination of all [Cloudflare public IPs ↗](https://www.cloudflare.com/ips/) and ICMP packets.

![Application definition screen with IP values](https://developers.cloudflare.com/_astro/app-definition.rcGh7Hqx_2gtAxy.webp)

1. Create a breakout Business Intent Overlay (BIO) to bypass the GRE tunnel as the first policy and use this newly created application as the match criteria.
2. Define at least one additional overlay policy and the traffic you want to send to Cloudflare over the GRE tunnels.

The service name used to send traffic through the tunnel created in the next step is **Cloudflare\_GRE**. The example uses **Match Everything** to send all other traffic through the established tunnel (both private east-west traffic & Internet bound north-south traffic through Cloudflare's Secure Web Gateway).

![Business Intent Overlay screen with breakout and CF overlays](https://developers.cloudflare.com/_astro/biz-intent-overlay.BKoZhAig_Z1M0aj7.webp)

_Note: Labels in this image may reflect a previous product name._

IPsec tunnel configuration

Cloudflare's [tunnel health checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/tunnel-health-checks/) are ping reply packets encapsulated in IPsec packets. The source IP is the EdgeConnect WAN interface used to establish a tunnel, and the destination IP is Cloudflare servers. These packets need to be sent directly from the WAN interface and not through the established tunnels.

To create the overlay policy:

1. Create a compound application, which is a combination of all [Cloudflare public IPs ↗](https://www.cloudflare.com/ips/) and ICMP packets.

![Application definition screen with IP values](https://developers.cloudflare.com/_astro/app-definition.rcGh7Hqx_2gtAxy.webp)

1. Create a breakout Business Intent Overlay (BIO) to bypass the IPsec tunnel as the first policy and use this newly created application as the match criteria.
2. Define at least one additional overlay policy and the traffic you want to send to Cloudflare over the IPsec tunnels.

The service name used to send traffic through the tunnel created in the next step is **Cloudflare\_IPsec**. The example uses **Match Everything** to send all other traffic through the established tunnel (both private east-west traffic and Internet bound north-south traffic through Cloudflare's Secure Web Gateway).

![Business Intent Overlay screen with breakout and CF overlays for IPsec](https://developers.cloudflare.com/_astro/biz-intent-overlay-ipsec.3QFGazIP_1mWssP.webp)

_Note: Labels in this image may reflect a previous product name._

## 3\. Create tunnels on Cloudflare and EdgeConnect

GRE tunnel configuration

![Diagram of GCP, Aruba Orchestratror, and Cloudflare products](https://developers.cloudflare.com/_astro/gcp-edgeconnect-diagram.K9bkvdja_Z1KbiN2.webp)

_Note: Labels in this image may reflect a previous product name._

1. Create a tunnel on the EdgeConnect using Cloudflare's assigned public anycast IP and the service used in the overlay policy in the [previous step](#2-configure-overlay-policies).
2. Create a Virtual Tunnel Interface (VTI) using the private IP pair shared with CF GRE tunnel endpoint and the passthrough tunnel to match the newly created tunnel alias (**CF\_GRE\_east** in our example).

![Modify Passthrough Tunnel screen](https://developers.cloudflare.com/_astro/modify-passthrough._Sp9J4KQ_1WgQok.webp)

![Edit Virtual Tunnel Interface screen](https://developers.cloudflare.com/_astro/edit-vti.BFWttrT1_Z1m7h1H.webp)

1. Define a GRE tunnel on the Cloudflare dashboard using the EdgeConnect appliance's public IP and the private IP pair /31 shared with the appliance.

![GRE tunnels information for each branch](https://developers.cloudflare.com/_astro/gre-tunnels-edgeconnect.CPxCqhiR_Z1wtVPz.webp)

IPsec tunnel configuration

![Diagram of GCP, Aruba Orchestratror, and Cloudflare products for IPsec tunnels](https://developers.cloudflare.com/_astro/gcp-edgeconnect-diagram-ipsec.CZWCUCOA_ZGfyzN.webp)

_Note: Labels in this image may reflect a previous product name._

For additional information on creating IPsec tunnels, refer to [API documentation for IPsec tunnels](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/ipsec%5Ftunnels/methods/create/).

* `X-Auth-Email`: Your Cloudflare email ID
* `X-Auth-Key`: Seen in the URL (`dash.cloudflare.com/<X-Auth-Key>/....`)
* `Account key`: Global API token in Cloudflare dashboard
1. Test new IPsec tunnel creation

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/ipsec_tunnels?validate_only=true" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "ipsec_tunnels": [

    {

      "name": "EdgeConnect_IPSEC_1",

      "customer_endpoint": "35.188.72.56",

      "cloudflare_endpoint": "172.64.241.205",

      "interface_address": "192.168.10.11/31",

      "description": "Tunnel for EdgeConnect - GCP Central"

    }

  ]

}'


```

1. Create a new IPsec tunnel

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/ipsec_tunnels \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "ipsec_tunnels": [

    {

      "name": "EdgeConnect_IPSEC_1",

      "customer_endpoint": "35.188.72.56",

      "cloudflare_endpoint": "172.64.241.205",

      "interface_address": "192.168.10.11/31",

      "description": "Tunnel for EdgeConnect - GCP Central"

    }

  ]

}'


```

```

{

  "result": {

    "ipsec_tunnels": [

      {

        "id": "tunnel_id",

        "interface_address": "192.168.10.11/31",

        "created_on": "2022-04-14T19:57:43.938376Z",

        "modified_on": "2022-04-14T19:57:43.938376Z",

        "name": "EdgeConnect_IPSEC_1",

        "cloudflare_endpoint": "172.64.241.205",

        "customer_endpoint": "35.188.72.56",

        "description": "Tunnel for EdgeConnect - GCP Central",

        "health_check": {

          "enabled": true,

          "target": "35.188.72.56",

          "type": "reply"

        }

      }

    ]

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

1. Generate Pre Shared Key (PSK) for tunnel

Use the tunnel ID from the response in Step 2\. Save the pre-shared key generated in this step as you will need it to set up tunnels on the Orchestrator.

Terminal window

```

curl --request POST \

"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/ipsec_tunnels/{tunnel_id}/psk_generate?validate_only=true" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

```

{

  "result": {

    "ipsec_id": "<ipsec_id>",

    "ipsec_tunnel_id": "<tunnel_id>",

    "psk": "XXXXXXXXXXXXXXXXX",

    "psk_metadata": {

      "last_generated_on": "2022-04-14T20:05:29.756514071Z"

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

**Create an IPsec tunnel on EdgeConnect**

You can create a tunnel after the Business Intent Overlay policies have been defined. Use the correct policy or service created in [configure overlay policy](#2-configure-overlay-policies). The local IP is the local WAN interface of the EdgeConnect device, and the remote IP is the Cloudflare public IP assigned as the tunnel endpoint.

![Modify Passthrough Tunnel dialog with General values](https://developers.cloudflare.com/_astro/general-modify-passthrough.3ViqT0DH_ZfWR5P.webp)

![Modify Passthrough Tunnel dialog with IKE values](https://developers.cloudflare.com/_astro/ike-modify-passthrough.BbQLufk__yvGnM.webp)

![Modify Passthrough Tunnel dialog with IPsec values](https://developers.cloudflare.com/_astro/ipsec-modify-passthrough.gtfn_fS__1ek6eo.webp)

**Create a Virtual Tunnel Interface (VTI) on the EdgeConnect appliance**

![Values for Edit VTI Interface](https://developers.cloudflare.com/_astro/vti-interface-ipsec.R28dnfpw_Z1UiKps.webp)

## 4\. Create static routes on Cloudflare and EdgeConnect

GRE tunnel configuration

1. Define static routes on the Cloudflare dashboard for the LAN subnet(s) attached to the EdgeConnect appliance. Use the private IP pair for the EdgeConnect tunnel endpoint.  
In this example, the traffic to subnet `10.3.0.0/16` attached to the **east\_branch** EdgeConnect appliance has a next hop of `10.40.8.10`.

![Static route information for each branch](https://developers.cloudflare.com/_astro/static-routes-cf.7x1mHyLW_ZPbNgG.webp)

1. Define static routes on the Orchestrator so Cloudflare can route traffic between sites.  
This example creates a route for the subnet `10.30.0.0/24` on the **west\_branch** to route via the established GRE tunnel between the EdgeConnect appliance and Cloudflare.

![Static route information for each branch](https://developers.cloudflare.com/_astro/static-routes-edgeconnect.UNNAmHeW_Z1L6bfF.webp)

IPsec tunnel configuration

![Static route values from Cloudflare dashboard](https://developers.cloudflare.com/_astro/static-routes-ipsec.QCWLampc_1jnDF.webp)

**Static routes for central branch on EdgeConnect**

![Static route values from EdgeConnect for central branch](https://developers.cloudflare.com/_astro/static-routes-central-ipsec.DXXq0rMA_Z18rSTN.webp)

**Static routes for west branch on EdgeConnect**

![Static route values from EdgeConnect for west branch](https://developers.cloudflare.com/_astro/static-routes-west-ipsec.DEkt69AP_2nnXp7.webp)

## 5\. Validate traffic flow

GRE tunnel configuration

**Validate Secure Web Gateway**

To validate traffic flow from the local subnet through Cloudflare's Secure Web Gateway, perform a cURL as shown in this example.

![Curl example for validating Secure Web Gateway](https://developers.cloudflare.com/_astro/validate-swg-curl.K6-tj_O9_1uqxFe.webp)

You can validate the request went through Gateway with the presence of the `Cf-Team` response header, or by looking at the logs in the dashboard under **Logs** \> **Gateway** \> **HTTP**.

![Dashboard example for validating Secure Web Gateway](https://developers.cloudflare.com/_astro/dash-validate-swg.CyAEktkx_Z1Ar1ds.webp)

**Validate east-west traffic**

To validate east-west traffic flow, perform a traceroute as shown in the example.

![Traceroute example for verifying east-west traffic](https://developers.cloudflare.com/_astro/validate-traceroute.B1qfKEZn_Z1k8o3c.webp)

The example shows a client in GCP East (`10.3.0.3`), which can ping the private IP of a client in GCP West (`10.30.0.4`).

The traceroute shows the path going from the client (`10.3.0.3`) to:

* the GCP East lan0 IP on the EdgeConnect (`10.3.0.2`)
* the Cloudflare private GRE endpoint IP (`10.4.8.11`)
* the GCP West lan0 IP on the West EdgeConnect (`10.30.0.3`)
* the GCP West client (`10.30.0.4`)

This validates the east-west traffic flow through Cloudflare WAN.

IPsec tunnel configuration

**Validate Secure Web Gateway**

To validate traffic flow from the local subnet through Cloudflare's Secure Web Gateway, perform a cURL as shown in this example.

![cURL example for validating traffic](https://developers.cloudflare.com/_astro/static-routes-west-ipsec.DEkt69AP_2nnXp7.webp)

You can validate the request went through Secure Web Gateway with the presence of the `Cf-Team` response header or by looking at the logs in the dashboard under **Logs** \> **Gateway** \> **HTTP**.

![Dashboard example for validating Secure Web Gateway](https://developers.cloudflare.com/_astro/dash-validation-ipsec.5ZgrnH6b_ZYuKac.webp)

**Validate east-west traffic**

To validate east-west traffic flow, perform a traceroute as shown in the example.

![Traceroute example for IPsec validation](https://developers.cloudflare.com/_astro/traceroute-ipsec.DIQvLqN1_jYHbJ.webp)

The example shows a client in GCP Central (`10.22.0.9`), which can ping the private IP of a client in GCP West (`10.77.0.10`).

The traceroute shows the path going from the client (`10.22.0.9`) to:

* the GCP Central lan0 IP on the EdgeConnect (`10.22.0.2`)
* the Cloudflare private IPsec endpoint IP (`192.168.10.11`)
* the GCP West EdgeConnect private IPsec endpoint IP (`192.168.15.10`)
* the GCP West client (`10.77.0.10`)

This validates the east-west traffic flow through Cloudflare WAN.

## 6\. Cloudflare policies

At this point, the GRE or IPsec tunnels should be connected from the EdgeConnect appliances to Cloudflare's global network, and traffic is scoped to route over the tunnels using the EdgeConnect Business Intent Overlays.

To begin filtering traffic and gathering analytics, refer to the [Cloudflare Network Firewall documentation](https://developers.cloudflare.com/cloudflare-network-firewall/) to learn how to create filters for east-west inter-branch traffic and the [Secure Web Gateway documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) to learn how to configure Gateway policies if you decide to send traffic from your local private subnets to the Internet through Cloudflare Gateway.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/aruba-edgeconnect/#page","headline":"Aruba EdgeConnect Enterprise · Cloudflare One docs","description":"Integrate Aruba EdgeConnect Enterprise with Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/aruba-edgeconnect/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPsec"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/","name":"Third-party integration"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/aruba-edgeconnect/","name":"Aruba EdgeConnect Enterprise"}}]}
```
