---
title: Virtual networks
description: Virtual networks in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Virtual networks

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode Traffic only mode                                                                                             | All plans                                                       |

| System   | Availability |
| -------- | ------------ |
| Windows  | ✅            |
| macOS    | ✅            |
| Linux    | ✅            |
| iOS      | ✅            |
| Android  | ✅            |
| ChromeOS | ✅            |

Virtual networks provide routing isolation within your Cloudflare account. Each virtual network maintains its own routing table, allowing you to separate traffic between different environments, partners, or applications.

For example, an organization may have separate "production" and "staging" VPC networks that both use the same private IP range (such as `10.128.0.0/24`). Without virtual networks, Cloudflare cannot distinguish between `10.128.0.1` in production and `10.128.0.1` in staging. By creating two virtual networks, you can deterministically route traffic to the correct environment. Users select which virtual network they want to connect to in the Cloudflare One Client.

For a conceptual overview of virtual networks, including how they work across Cloudflare products, refer to [Virtual networks](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/).

## Use cases

Here are a few scenarios where virtual networks may prove useful:

* Manage production and staging environments that use the same address space.
* Manage acquisitions or mergers between organizations that use the same address space.
* Allow IT professional services to access their customer's network for various administration and management purposes.
* Allow developers or homelab users to deterministically route traffic through their home network to enforce additional security controls.
* Guarantee additional segmentation (beyond just policy enforcement) between networks and resources for security reasons, while keeping all configuration within a single Cloudflare account.

## Prerequisites

* [Install cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) on each private network.
* [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on user devices.

## Create a virtual network

In this example, "private network" refers to a distinct environment (such as staging or production) that has its own overlapping IP address space (`10.128.0.1/32` staging and `10.128.0.1/32` production). If your environments use non-overlapping IPs, you do not need a separate tunnel for each. Instead, you can add multiple routes to a single tunnel.

* [ Dashboard ](#tab-panel-7294)
* [ Terraform (v5) ](#tab-panel-7295)
* [ Locally-managed tunnels ](#tab-panel-7296)

To route overlapping IPs over virtual networks:

1. Create two unique virtual networks:  
   1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Routes** \> **Virtual networks**.  
   Note  
   The **Virtual networks** card will only appear if a CIDR route exists in your account. If you do not already have a route, you can navigate to **Virtual networks** using this [direct link ↗](https://dash.cloudflare.com/?to=/:account/one/networks/routes/cidr/vnets).  
   2. Select **Create virtual network**.  
   3. Name your virtual network `staging-vnet` and select **Save**.  
   4. Repeat Steps 1a-1d to create another virtual network called `production-vnet`.
2. Create a Cloudflare Tunnel for each private network with overlapping IPs (one tunnel per isolated environment, for example staging and production):  
   1. Go to **Networks** \> **Connectors** \> **Cloudflare Tunnels**.  
   2. Select **Create a tunnel**.  
   3. Name your tunnel `Staging tunnel` and select **Save tunnel**.  
   4. Install the connector within your staging environment.  
   5. In the **CIDR** tab, add `10.128.0.1/32`.  
   6. Select **Additional settings**. Under **Virtual networks**, select _staging-vnet_.  
   7. Save the tunnel.  
   8. Repeat Steps 2a-2g to create another tunnel called `Production tunnel`. Be sure to install the connector within your production environment and assign the route to _production-vnet_.

We now have two overlapping IP addresses routed over `staging-vnet` and `production-vnet` respectively. You can use the Cloudflare One Client to [switch between virtual networks](#connect-to-a-virtual-network).

To route overlapping IPs over virtual networks:

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Cloudflare Tunnel Write`
2. Create two unique virtual networks:  
```  
resource "cloudflare_zero_trust_tunnel_cloudflared_virtual_network" "staging_vnet" {  
  account_id = var.cloudflare_account_id  
  name       = "staging-vnet"  
  comment    = "Staging virtual network"  
  is_default = false  
}  
resource "cloudflare_zero_trust_tunnel_cloudflared_virtual_network" "production_vnet" {  
  account_id = var.cloudflare_account_id  
  name       = "production-vnet"  
  comment    = "Production virtual network"  
  is_default = false  
}  
```
3. Create a Cloudflare Tunnel for each private network with overlapping IPs (one tunnel per isolated environment, for example staging and production):  
```  
resource "cloudflare_zero_trust_tunnel_cloudflared" "staging_tunnel" {  
  account_id = var.cloudflare_account_id  
  name       = "Staging tunnel"  
  config_src = "cloudflare"  
}  
resource "cloudflare_zero_trust_tunnel_cloudflared" "production_tunnel" {  
  account_id = var.cloudflare_account_id  
  name       = "Production tunnel"  
  config_src = "cloudflare"  
}  
```
4. Route `10.128.0.1/32` through `Staging tunnel` and assign it to `staging-vnet`. Route `10.128.0.1/32` through `Production tunnel` and assign it to `production-vnet`.  
```  
resource "cloudflare_zero_trust_tunnel_cloudflared_route" "staging_tunnel_route" {  
  account_id         = var.cloudflare_account_id  
  tunnel_id          = cloudflare_zero_trust_tunnel_cloudflared.staging_tunnel.id  
  network            = "10.128.0.1/32"  
  comment            = "Staging tunnel route"  
  virtual_network_id = cloudflare_zero_trust_tunnel_cloudflared_virtual_network.staging_vnet.id  
}  
resource "cloudflare_zero_trust_tunnel_cloudflared_route" "production_tunnel_route" {  
  account_id         = var.cloudflare_account_id  
  tunnel_id          = cloudflare_zero_trust_tunnel_cloudflared.production_tunnel.id  
  network            = "10.128.0.1/32"  
  comment            = "Production tunnel route"  
  virtual_network_id = cloudflare_zero_trust_tunnel_cloudflared_virtual_network.production_vnet.id  
}  
```
5. [Get the token](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/#get-the-tunnel-token) for each tunnel.
6. Using the tunnel tokens, run `Staging tunnel` in your staging environment and run `Production tunnel` in your production environment. Refer to [Install and run the tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/#4-install-and-run-the-tunnel).

To route overlapping IPs over virtual networks for [locally-managed tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/):

1. Create a Cloudflare Tunnel for each private network with overlapping IPs (one tunnel per isolated environment, for example staging and production):  
   1. Within your staging environment, authenticate `cloudflared`:  
   Terminal window  
   ```  
   cloudflared login  
   ```  
   2. Create a tunnel to connect your staging network to Cloudflare.  
   Terminal window  
   ```  
   cloudflared tunnel create staging-tunnel  
   ```  
   3. Within your production environment, authenticate `cloudflared`:  
   Terminal window  
   ```  
   cloudflared login  
   ```  
   4. Create a tunnel to connect your production network to Cloudflare.  
   Terminal window  
   ```  
   cloudflared tunnel create production-tunnel  
   ```

The following steps may be executed from any `cloudflared` instance.

1. Create two unique virtual networks.  
Terminal window  
```  
cloudflared tunnel vnet add staging-vnet  
cloudflared tunnel vnet add production-vnet  
```
2. Before moving on, run the following command to verify that your newly created virtual networks are listed correctly:  
Terminal window  
```  
cloudflared tunnel vnet list  
```

Default virtual network

All accounts come pre-configured with a virtual network named `default`. You can choose a new default by typing `cloudflared tunnel vnet update --default <virtual-network-name>`.

1. Configure your tunnels with the IP/CIDR range of your private networks, and assign the tunnels to their respective virtual networks.  
Terminal window  
```  
cloudflared tunnel route ip add --vnet staging-vnet 10.128.0.3/32 staging-tunnel  
cloudflared tunnel route ip add --vnet production-vnet 10.128.0.3/32 production-tunnel  
```
2. Verify that the IP routes are listed correctly:  
Terminal window  
```  
cloudflared tunnel route ip list  
```  
We now have two overlapping IP addresses routed over `staging-vnet` and `production-vnet` respectively.  
   1. Within your staging environment, create a [configuration file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/) for `staging-tunnel`. The configuration file will be structured as follows:  
   ```  
   tunnel: <Tunnel-UUID>  
   credentials-file: /root/.cloudflared/credentials-file.json  
   warp-routing:  
      enabled: true  
   ```  
   2. Run your tunnel.  
   Terminal window  
   ```  
   cloudflared tunnel run staging-tunnel  
   ```  
   3. Within your production environment, repeat Steps 6 and 7 for `production-tunnel`.  
You can use now the Cloudflare One Client to [switch between virtual networks](#connect-to-a-virtual-network).

## Delete a virtual network

* [ Dashboard ](#tab-panel-7290)
* [ Locally-managed tunnels ](#tab-panel-7291)

To delete a virtual network:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels** and ensure that no IP routes are assigned to the virtual network you are trying to delete. If your virtual network is in use, delete the route or reassign it to a different virtual network.
2. Next, go to **Networks** \> **Routes**.
3. In **Virtual networks**, find your virtual network.
4. Select the three-dot menu and choose **Delete**.

You can optionally delete the tunnel associated with your virtual network.

To delete a virtual network for [locally-managed tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/):

1. Delete all IP routes in the virtual network. For example,  
Terminal window  
```  
cloudflared tunnel route ip delete --vnet staging-vnet 10.128.0.3/32  
```
2. (Optional) Delete the tunnel associated with the virtual network.  
Terminal window  
```  
cloudflared tunnel delete staging-tunnel  
```
3. Delete the virtual network.  
Terminal window  
```  
cloudflared tunnel vnet delete staging-vnet  
```

You can verify that the virtual network was successfully deleted by typing `cloudflared tunnel vnet list`.

## Connect to a virtual network

### Windows, macOS, and Linux

* [ Version 2026.2+ ](#tab-panel-7292)
* [ Version 2026.1 and earlier ](#tab-panel-7293)

1. Open the Cloudflare One Client.
2. Go to **Home**.
3. In the **VNET** dropdown, choose the virtual network you want to connect to (for example, `staging-vnet`).

1. Open the Cloudflare One Client.
2. Go to **Settings** \> **Traffic and DNS mode** \> **Virtual Networks**.
3. Choose the virtual network you want to connect to, for example `staging-vnet`.

When you visit `10.128.0.3/32`, the Cloudflare One Client will route your request to the staging environment.

### iOS, Android, and ChromeOS

1. Launch the Cloudflare One Agent app.
2. Go to **Advanced** \> **Connection options** \> **Virtual networks**.
3. Choose the virtual network you want to connect to, for example `staging-vnet`.

When you visit `10.128.0.3/32`, the Cloudflare One Client will route your request to the staging environment.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/#page","headline":"Virtual networks · Cloudflare One docs","description":"Virtual networks in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/","name":"Connect with cloudflared"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/","name":"Virtual networks"}}]}
```
