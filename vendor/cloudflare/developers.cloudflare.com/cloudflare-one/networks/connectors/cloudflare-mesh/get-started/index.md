---
title: Get started
description: Get started in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Set up Cloudflare Mesh so your devices and servers can reach each other by private IP.

## Prerequisites

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* A laptop or phone to connect as a client device
* (Optional) A Linux server to deploy a Mesh node  
Linux server requirements  
| **OS version**             | CentOS 8, RHEL 8, RHEL 9 [1](#user-content-fn-1), Debian 12, Debian 13, Fedora 34, Fedora 35, Ubuntu 22.04 LTS, Ubuntu 24.04 LTS |  
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |  
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                                                                                |  
| **HD space**               | 75 MB                                                                                                                            |  
| **Memory**                 | 35 MB                                                                                                                            |  
| **Network interface type** | Wi-Fi or LAN                                                                                                                     |  
| **MTU**                    | 1381 bytes recommended [2](#user-content-fn-2)                                                                                   |  
## Footnotes  
   1. On RHEL 9 and later, enable the [Extra Packages for Enterprise Linux (EPEL) ↗](https://docs.fedoraproject.org/en-US/epel/) repository (`sudo dnf install epel-release`) before installing `cloudflare-warp`. EPEL provides dependencies required by the client UI. [↩](#user-content-fnref-1)  
   2. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-2)  
Mesh nodes are optional  
Client-to-client connectivity works without any Mesh nodes. Two enrolled laptops can reach each other directly by Mesh IP. Mesh nodes are for running the client in headless mode on a server — either to make that server reachable by its Mesh IP, or to [route traffic to a private subnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) behind it. You still need to complete the setup wizard to configure your account — you can skip the Mesh node installation step and connect the node later.

## 1\. Run the setup wizard

The setup wizard [configures your account for Mesh networking](#what-the-wizard-configures) and optionally guides you through creating a Mesh node. This is a one-time setup.

1. In the Cloudflare dashboard, go to **Networking** \> **Mesh**.  
[ Go to **Mesh** ](https://dash.cloudflare.com/?to=/:account/mesh)
2. Select **Add a node**.
3. Enter a name for your node (for example, `web-server` or `staging-db`).
4. Select **Create node**.
5. (Optional) If you have a Linux server, run the install commands shown in the dashboard to bring the node online. If you do not have a server ready, select **I'll connect later** — you can install the node at any time from the node detail page.  
Installation commands  
   * [ Debian / Ubuntu ](#tab-panel-7229)  
   * [ RedHat / CentOS ](#tab-panel-7230)  
Terminal window  
```  
curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor -o /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg &&  
echo "deb [signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ $(. /etc/os-release && echo $VERSION_CODENAME) main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list &&  
sudo apt-get update -qq && sudo apt-get install -y -qq cloudflare-warp &&  
printf 'net.ipv4.ip_forward = 1\nnet.ipv6.conf.all.forwarding = 1\nnet.ipv6.conf.all.accept_ra = 2\n' | sudo tee /etc/sysctl.d/99-zzz-cloudflare-warp-connector.conf &&  
sudo sysctl --system  
```  
Terminal window  
```  
sudo warp-cli connector new <TOKEN> && sudo warp-cli connect  
```  
On RHEL 9 and later, enable the Extra Packages for Enterprise Linux (EPEL) repository before installing `cloudflare-warp`. EPEL provides dependencies required by the Cloudflare One Client UI:  
Terminal window  
```  
sudo dnf install -y epel-release  
```  
Then install the package:  
Terminal window  
```  
curl -fsSl https://pkg.cloudflareclient.com/cloudflare-warp-ascii.repo | sudo tee /etc/yum.repos.d/cloudflare-warp.repo &&  
sudo yum install -y cloudflare-warp &&  
printf 'net.ipv4.ip_forward = 1\nnet.ipv6.conf.all.forwarding = 1\nnet.ipv6.conf.all.accept_ra = 2\n' | sudo tee /etc/sysctl.d/99-zzz-cloudflare-warp-connector.conf &&  
sudo sysctl --system  
```  
Terminal window  
```  
sudo warp-cli connector new <TOKEN> && sudo warp-cli connect  
```
6. Select **View node details** to complete the setup wizard.

If you installed the node, it should appear as **Online** on the Mesh overview page along with its assigned **Mesh IP**. If the node does not come online, refer to [Troubleshooting](#troubleshooting).

## 2\. Connect a client device

Connect a laptop or phone to your Mesh network:

### Windows, macOS, and Linux

To enroll your device using the client GUI:

* [ Version 2026.2+ ](#tab-panel-7231)
* [ Version 2026.1 and earlier ](#tab-panel-7232)

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

Once you see a **Connected** status, your device is on the mesh and receives its own Mesh IP.

## 3\. Test connectivity

From your client device, verify you can reach a Mesh node or another enrolled device:

Terminal window

```

ping <MESH-IP>


```

Replace `<MESH-IP>` with the Mesh IP of a node or another device (visible on the Mesh overview page). You can also SSH, connect to a database, or call an API — any TCP, UDP, or ICMP traffic works.

## Logs

Traffic from Mesh nodes appears in [Gateway activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) with the identity `warp_connector@<your-team-name>.cloudflareaccess.com`. Client device traffic appears in Gateway activity logs under the enrolled user's identity.

## What the wizard configures

When you create your first Mesh node, the setup wizard automatically provisions several Cloudflare One settings so you do not have to configure them manually:

| Setting                                                                                                                                                                                                                                                                                                                                                                                                                                                         | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Device enrollment policy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/)                                                                                                                                                                                                                                                                                                     | Allows devices to enroll into your Cloudflare One account using email-based [one-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/). Only created if you do not already have an existing device enrollment policy in your account.                                                                                                                                                      |
| [Device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/)                                                                                                                                                                                                                                                                                                                  | Creates a profile configured with [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) in **Include mode**, so only Mesh traffic routes through Cloudflare. This prevents disrupting existing network connectivity on your server. Only created if you do not already have an active Mesh node (formerly WARP Connector) in your account. |
| [Allow all Cloudflare One traffic to reach enrolled devices](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-all-cloudflare-one-traffic-to-reach-enrolled-devices) and [Assign a unique IP address to each device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#assign-a-unique-ip-address-to-each-device) | Enables device-to-device connectivity for Mesh networking.                                                                                                                                                                                                                                                                                                                                                                                     |
| [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/)                                                                                                                                                                                                                                                                                                                                                                       | Enables the TCP, UDP, and ICMP traffic proxy for Mesh communication.                                                                                                                                                                                                                                                                                                                                                                           |

### Existing Cloudflare One accounts

If your account already has a Cloudflare One deployment, the setup wizard will not overwrite your existing configuration. Verify the following settings are enabled for Mesh to work:

* **Device enrollment** — At least one [enrollment rule](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) must exist so that devices and nodes can register with your account.
* **Device profile for Mesh nodes** — Your Mesh nodes need a [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) that uses **Include mode** with the Mesh IP range (`100.96.0.0/12`) included. If your nodes use Exclude mode instead, remove `100.64.0.0/10` (the default CGNAT exclusion) from the exclude list.
* **Mesh connectivity** — In your device profile settings, enable [Allow all Cloudflare One traffic to reach enrolled devices](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-all-cloudflare-one-traffic-to-reach-enrolled-devices).
* **Unique device IPs** — Enable [Assign a unique IP address to each device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#assign-a-unique-ip-address-to-each-device) so that each participant gets a routable Mesh IP.
* **Client mode** — Mesh nodes must run in [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/). DNS-only or proxy-only modes are not supported.
* **Traffic proxying** — Enable the [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/) for TCP, UDP, and ICMP so that Mesh traffic can flow between devices.

## Troubleshooting

* **Node shows as Offline** — On the server, run `warp-cli status`. If the output does not show `Status update: Connected`:  
   * Run `warp-cli connect`.  
   * If your private network uses a firewall to restrict Internet traffic, ensure that it allows the [WARP ports and IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).  
   * Review your [WARP daemon logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) for information about why the connection is failing.
* **Client device cannot reach Mesh IPs** — Verify that your Split Tunnel configuration routes the Mesh IP range (`100.96.0.0/12`) through Cloudflare. For details, refer to [Connect client devices](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/client-devices/).
* **Windows firewall blocks Mesh traffic** — Windows Firewall blocks inbound traffic from `100.96.0.0/12` by default. Add a firewall rule that allows incoming requests from this range for your desired protocols and ports.

For general client issues, refer to [Troubleshoot the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/).

## Next steps

* [**Connect client devices**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/client-devices/) — Platform-specific installation details, Split Tunnel configuration, and firewall considerations.
* [**Add routes**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) — Make an entire subnet behind your node reachable (databases, printers, other servers).
* [**Enable high availability**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/high-availability/) — Run multiple replicas for production resilience.
* [**Tips and best practices**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/tips/) — Cloud VPC configuration, updating the client, running alongside cloudflared.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/#page","headline":"Get started with Cloudflare Mesh · Cloudflare One docs","description":"Get started in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-mesh/","name":"Cloudflare Mesh"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/","name":"Get started"}}]}
```
