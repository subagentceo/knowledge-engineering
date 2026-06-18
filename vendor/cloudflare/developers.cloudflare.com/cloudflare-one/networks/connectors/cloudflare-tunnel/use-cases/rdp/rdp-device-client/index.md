---
title: Connect to RDP using the Cloudflare One Client
description: Connect to RDP using the Cloudflare One Client in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to RDP using the Cloudflare One Client

The [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) allows users to connect to RDP servers using their preferred RDP client. Cloudflare Tunnel creates a secure, outbound-only connection from your RDP server to Cloudflare's global network; this requires running the `cloudflared` daemon on the server (or any other host machine within the private network). Users install the Cloudflare One Client on their device and enroll in your Zero Trust organization. Remote devices will be able to connect as if they were on your private network. By default, all devices enrolled in your organization can connect to the RDP server unless you build policies to allow or block specific users.

This example walks through how to set up an RDP server on a Google Cloud Platform (GCP) virtual machine (VM), but you can use any machine that supports RDP connections.

## 1\. Set up an RDP server in GCP

1. In your [Google Cloud Console ↗](https://console.cloud.google.com/), [create a new project ↗](https://developers.google.com/workspace/guides/create-project).
2. Go to **Compute Engine** \> **VM instances**.
3. Select **Create instance**.
4. Name your VM instance, for example `windows-rdp-server`.
5. Configure your VM instance:  
   1. Scroll down to **Boot Disk** and select **Change**.  
   2. For **Operating system**, select _Windows Server_.  
   3. Choose a **Version** with Desktop Experience, for example _Windows Server 2016 Datacenter_.
6. Once your VM is running, open the dropdown next to **RDP** and select _View gcloud command to reset password_.
7. Select **Run in Cloud Shell**.
8. Run the command in the Cloud Shell terminal. You will be asked to confirm the password reset.
9. Copy the auto-generated password and username to a safe place.

## 2\. Install Microsoft Remote Desktop

You can use any RDP client to access and configure the RDP server.

To access the server through Microsoft Remote Desktop:

1. Download and install [Microsoft Remote Desktop ↗](https://apps.microsoft.com/store/detail/microsoft-remote-desktop/9WZDNCRFJ3PS).
2. Once downloaded, open Microsoft Remote Desktop and select **Add a PC**.
3. For **PC name**, enter the public IP address of your RDP server. In GCP, this is the **External IP** of the VM instance.
4. For **User account**, select **Add User Account** and enter your auto-generated password and username.
5. Select **Add**. The PC will display in Microsoft Remote Desktop.
6. To test basic connectivity, double-click the newly added PC.
7. When asked if you want to continue, select **Continue**.

You can now remotely access the RDP server using its public IP. The next steps will configure access to the server using its private IP.

Note

By default, Internet Explorer will be installed and configured in [Enhanced Security mode ↗](https://learn.microsoft.com/troubleshoot/developer/browsers/security-privacy/enhanced-security-configuration-faq#internet-explorer-enhanced-security-configuration). If the browser is slow or unable to load, you can turn off Enhanced Security and install an alternate browser such as Google Chrome.

## 3\. Connect the server to Cloudflare

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. [Create a new tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or edit an existing `cloudflared` tunnel.
1. In the **CIDR** tab for the tunnel, enter the private IP or CIDR address of your server. In GCP, the server IP is the **Internal IP** of the VM instance.
2. (Optional) [Set up Zero Trust policies](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/#4-recommended-filter-network-traffic-with-gateway) to fine-tune access to your server.

## 4\. Set up the client

To connect your devices to Cloudflare:

1. [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on your devices in Traffic and DNS mode or [generate a proxy endpoint](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) and deploy a PAC file.
2. [Create device enrollment rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) to determine which devices can enroll to your Zero Trust organization.

## 5\. Route private network IPs through the Cloudflare One Client

By default, WARP excludes traffic bound for [RFC 1918 space ↗](https://datatracker.ietf.org/doc/html/rfc1918), which are IP addresses typically used in private networks and not reachable from the Internet. In order for the Cloudflare One Client to send traffic to your private network, you must configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that the IP/CIDR of your private network routes through the Cloudflare One Client.

1. First, check whether your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include** mode.
2. Edit your Split Tunnel routes depending on the mode:  
   * [ Exclude IPs and domains ](#tab-panel-7312)  
   * [ Include IPs and domains ](#tab-panel-7313)  
If you are using **Exclude** mode:  
a. [Delete the route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#remove-a-route) containing your private network's IP/CIDR range. For example, if your network uses the default AWS range of `172.31.0.0/16`, delete `172.16.0.0/12`.  
b. [Re-add IP/CIDR ranges](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) that are not explicitly used by your private network. For the AWS example above, you would add new entries for `172.16.0.0/13`, `172.24.0.0/14`, `172.28.0.0/15`, and `172.30.0.0/16`. This ensures that only traffic to `172.31.0.0/16` routes through the Cloudflare One Client.  
You can use the following calculator to determine which IP addresses to re-add:  
**Base CIDR:** **Subtracted CIDRs:**  
Calculate  
Calculator instructions  
   1. In **Base CIDR**, enter the RFC 1918 range that you deleted from Split Tunnels.  
   2. In **Subtracted CIDRs**, enter the IP/CIDR range used by your private network.  
   3. Re-add the calculator results to your Split Tunnel Exclude mode list.  
By tightening the private IP range included in the Cloudflare One Client, you reduce the risk of breaking a user's [access to local resources](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion).  
If you are using **Include** mode:  
   1. Add the required [Zero Trust domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-domains) or [IP addresses](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-ip-addresses) to your Split Tunnel include list.  
   2. [Add a route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) to include your private network's IP/CIDR range.

## 6\. Connect as a user

Once the Cloudflare One Client is configured, you can use your RDP client to connect to the server's private IP address (instead of the public IP address used initially).

To connect in Microsoft Remote Desktop:

1. Open Microsoft Remote Desktop and select **Add a PC**.
2. For **PC name**, enter the private IP address of your RDP server. In GCP, this is the **Internal IP** of the VM instance.
3. For **User account**, enter your RDP server username and password.
4. To test Zero Trust connectivity, double-click the newly added PC.
5. When asked if you want to continue, select **Continue**.

You now have secure, remote access to the RDP server.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-device-client/#page","headline":"Connect to RDP using the Cloudflare One Client · Cloudflare One docs","description":"Connect to RDP using the Cloudflare One Client in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-device-client/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["RDP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/","name":"RDP"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-device-client/","name":"Connect to RDP using the Cloudflare One Client"}}]}
```
