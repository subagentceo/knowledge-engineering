---
title: Connect client devices
description: Connect client devices in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect client devices

Client devices — laptops, phones, and desktops — join your Mesh network by installing the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and enrolling. Each device receives a [Mesh IP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/#mesh-ips) and can immediately communicate with every other enrolled device and Mesh node.

## Prerequisites

* [Device enrollment permissions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) are configured for your account. The Mesh [setup wizard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/) handles this automatically.

## 1\. Enroll the Cloudflare One Client

Connect a laptop or phone to your Mesh network:

### Windows, macOS, and Linux

To enroll your device using the client GUI:

* [ Version 2026.2+ ](#tab-panel-7227)
* [ Version 2026.1 and earlier ](#tab-panel-7228)

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Client.
2. Launch the Cloudflare One Client.
3. On the **What would you like to use the Cloudflare One Client for?** screen, select **Zero Trust security**.
4. Enter your team name.
5. Complete the authentication steps required by your organization.  
Once authenticated, you will see a Success page and a dialog prompting you to open the Cloudflare One Client.
6. Select **Open the Cloudflare One Client** to complete the registration.

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Client.
2. Launch the Cloudflare One Client.
3. Select the Cloudflare logo in the menu bar.
4. Select the gear icon.
5. Go to **Preferences** \> **Account**.
6. Select **Login with Cloudflare Zero Trust**.
7. Enter your team name.
8. Complete the authentication steps required by your organization.  
Once authenticated, you will see a Success page and a dialog prompting you to open the Cloudflare One Client.
9. Select **Open Cloudflare WARP.app** to complete the registration.

### iOS and Android

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Agent app.
2. Launch the Cloudflare One Agent app.
3. Select **Next**.
4. Review the privacy policy and select **Accept**.
5. Enter your team name.
6. Complete the authentication steps required by your organization.
7. After authenticating, select **Install VPN Profile**.
8. In the **Connection request** popup window, select **OK**.
9. If you did not enable [auto-connect ↗](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect), manually turn on the switch to **Connected**.

After enrollment, the device receives a Mesh IP and connects to your Mesh network.

## 2\. Verify connectivity

Test that the device can reach a Mesh node or another client device:

Terminal window

```

ping <MESH-IP>


```

Replace `<MESH-IP>` with the Mesh IP of a node (visible on the [Mesh overview page ↗](https://dash.cloudflare.com/?to=/:account/mesh)) or another enrolled device. Any TCP, UDP, or ICMP traffic works — you can SSH, connect to databases, call APIs, or run any protocol over Mesh IPs.

## What devices can reach

Once connected, a client device can:

* **Other client devices** — Reach any enrolled device by its Mesh IP. No Mesh nodes involved.
* **Mesh nodes** — Reach any online node by its Mesh IP. SSH, database connections, API calls all work.
* **Subnets behind nodes** — Access hosts on private networks that a node advertises via [CIDR routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) (for example, printers, databases, or servers that cannot run the client).

All traffic is subject to your [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/), so you can control which users and devices can reach specific resources.

## Split Tunnel configuration

For client devices to reach Mesh IPs, the Mesh IP range must route through Cloudflare. How you configure this depends on your [Split Tunnel mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/).

### Exclude mode (default)

In Exclude mode, the CGNAT range (`100.64.0.0/10`) is excluded from Cloudflare by default. Remove the CGNAT range from your exclude list so that Mesh IP traffic routes through Cloudflare.

If you used the [Mesh setup wizard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/#1-run-the-setup-wizard), the wizard creates a device profile in **Include mode** for Mesh nodes. However, your client devices may still use the default profile with Exclude mode. Verify that `100.96.0.0/12` (or your custom device IP range) is not in the exclude list.

Depending on your Cloudflare networking configuration, you may need to remove additional IPs from your exclude list. For a list of IPs to check, refer to [Reserved IP addresses](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/).

### Include mode

In Include mode, add the following to your include list:

* `100.96.0.0/12` — Mesh IPs (device IPs)
* `100.80.0.0/16` and `2606:4700:0cf1:4000::/64` — Hostname routing (if used)
* Any CIDR routes you have [configured for your Mesh nodes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/)

## Firewall considerations

Some operating systems block inbound traffic from the Mesh IP range by default:

* **Windows** — Windows Firewall blocks inbound traffic from `100.96.0.0/12`. Add a firewall rule that allows incoming requests from `100.96.0.0/12` for your desired protocols and ports.
* **macOS / Linux** — Most configurations allow this traffic by default. If you have custom firewall rules, ensure `100.96.0.0/12` is permitted.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/client-devices/#page","headline":"Connect client devices to Cloudflare Mesh · Cloudflare One docs","description":"Connect client devices in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/client-devices/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-mesh/","name":"Cloudflare Mesh"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-mesh/client-devices/","name":"Connect client devices"}}]}
```
