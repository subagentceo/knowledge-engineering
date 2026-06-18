---
title: SMB
description: SMB in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SMB

The Server Message Block (SMB) protocol allows users to read, write, and access shared resources on a network. Due to security risks, firewalls and ISPs usually block public connections to an SMB file share. With Cloudflare Tunnel, you can provide secure and simple SMB access to users outside of your network.

Note

SMB is sensitive to network latency. When a share is accessed over a remote connection rather than a local network, the protocol's block-based, round-trip-heavy design can slow transfers. For guidance on improving SMB performance over a WAN, refer to Microsoft's [Performance tuning for SMB file servers ↗](https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/role/file-server/).

Cloudflare Zero Trust offers two solutions for connecting to SMB servers:

* [Private subnet routing with the Cloudflare One Client to Tunnel](#connect-to-smb-server-with-the-cloudflare-one-client-to-tunnel)
* [Public hostname routing with cloudflared access](#connect-to-smb-server-with-cloudflared-access)

## Set up an SMB server on Linux

While SMB was developed for Microsoft Windows, Samba provides SMB connectivity from UNIX-like and BSD systems. A Samba server can be set up using this [guide ↗](https://ubuntu.com/tutorials/install-and-configure-samba#1-overview) on an Ubuntu machine.

## Connect to SMB server with the Cloudflare One Client to Tunnel

You can use Cloudflare Tunnel to create a secure, outbound-only connection from your server to Cloudflare's global network. This requires running the `cloudflared` daemon on the server. Users reach the service by installing the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) on their device and enrolling in your Zero Trust organization. Remote devices will be able to connect as if they were on your private network. By default, all devices enrolled in your organization can access the service unless you build policies to allow or block specific users.

### 1\. Connect the server to Cloudflare

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. [Create a new tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or edit an existing `cloudflared` tunnel.
1. In the **CIDR** tab for the tunnel, enter the private IP or CIDR address of your server.
2. (Optional) [Set up Zero Trust policies](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#4-recommended-filter-network-traffic-with-gateway) to fine-tune access to your server.

### 2\. Set up the client

To connect your devices to Cloudflare:

1. [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on your devices in Traffic and DNS mode or [generate a proxy endpoint](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) and deploy a PAC file.
2. [Create device enrollment rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) to determine which devices can enroll to your Zero Trust organization.

### 3\. Route private network IPs through the Cloudflare One Client

By default, WARP excludes traffic bound for [RFC 1918 space ↗](https://datatracker.ietf.org/doc/html/rfc1918), which are IP addresses typically used in private networks and not reachable from the Internet. In order for the Cloudflare One Client to send traffic to your private network, you must configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that the IP/CIDR of your private network routes through the Cloudflare One Client.

1. First, check whether your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include** mode.
2. Edit your Split Tunnel routes depending on the mode:  
   * [ Exclude IPs and domains ](#tab-panel-7314)  
   * [ Include IPs and domains ](#tab-panel-7315)  
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

### 4\. Connect as a user

#### macOS

1. In the Finder menu, select **Go** \> **Connect to Server**.
2. Enter `smb://<smb-server-ip-address>/sambashare`.  
![Connect to SMB server in macOS](https://developers.cloudflare.com/_astro/smb-connect.C4nMiFKp_Z1namc2.webp)
3. Sign in with the username and password created while setting up the server.

#### Windows

1. Open File Explorer and right-click **Network** \> **Map Network Drive**.
2. For **Folder**, enter `\\<server-private-ip>\sambashare`.
3. Select **Connect using different credentials**.
4. Select **Finish**.
5. Sign in with the username and password created while setting up the server.

## Connect to SMB server with `cloudflared access`

Cloudflare Tunnel can also route applications through a public hostname, which allows users to connect to the application without the Cloudflare One Client. This method requires having `cloudflared` installed on both the server machine and on the client machine, as well as an active zone on Cloudflare. The traffic is proxied over this connection, and the user logs in to the server with their Cloudflare Access credentials.

The public hostname method can be implemented in conjunction with routing over the Cloudflare One Client so that there are multiple ways to connect to the server. You can reuse the same tunnel for both the private network and public hostname routes.

### 1\. Connect the server to Cloudflare

1. Create a Cloudflare Tunnel by following our [dashboard setup guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).
2. In the **Published application routes** tab, choose a domain from the drop-down menu and specify any subdomain (for example, `smb.example.com`).
3. For **Service**, select _SMB_ and enter the SMB listening port (for example, `localhost:445`). SMB drives listen on port `139` or `445` by default.
4. Select **Save**.

### 2\. (Recommended) Create an Access application

By default, anyone on the Internet can connect to the server using the hostname of the published application. To allow or block specific users, create a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) in Cloudflare Access.

### 3\. Connect as a user

1. [Install cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) on the client machine.
2. Run the following command to open an SMB listening port. You can specify any available port on the client machine.  
Terminal window  
```  
cloudflared access tcp --hostname smb.example.com --url localhost:8445  
```  
This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.
3. [Open your SMB client](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/#4-connect-as-a-user) and configure the client to point to `smb://localhost:8445/sambashare`. Do not input the hostname.
4. Sign in with the username and password created while setting up the server.

#### Windows-specific requirements

If you are using a Windows machine and cannot specify the port for SMB, you might need to disable the local server. The local server on a client machine uses the same default port `445` for CIFS/SMB. By listening on that port, the local server can block the `cloudflare access` connection.

Warning

The Windows Server service supports share actions over a network like file, print, and named-pipe. Disabling this service can cause those actions to fail to start.

To disable the local server on a Windows machine:

1. Select **Win**+**R** to open the Run window.
2. Type `services.msc` and select **Enter**.
3. Locate the local server process, likely called `Server`.
4. Stop the service and set **Startup type** to _Disabled_.
5. Repeat steps 3 and 4 for `TCP/IP NetBIOS Helper`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/#page","headline":"SMB · Cloudflare One docs","description":"SMB in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks","Windows","MacOS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/","name":"SMB"}}]}
```
