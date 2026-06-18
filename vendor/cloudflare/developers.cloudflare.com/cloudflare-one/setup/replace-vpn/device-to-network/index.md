---
title: Device to network
description: Connect a remote device to a private network using Cloudflare Tunnel and the Cloudflare One Client.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Device to network

Connect a remote device to a private network so your users can securely access internal applications and services from anywhere, without the security risks and performance bottlenecks of a traditional VPN.

To explore other connection scenarios, refer to [Replace your VPN](https://developers.cloudflare.com/cloudflare-one/setup/replace-vpn/).

This guide follows the same steps as the **Get Started** onboarding wizard in the [Cloudflare One dashboard ↗](https://one.dash.cloudflare.com).

## How it works

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) is a network connector that creates an outbound-only connection between your private network and Cloudflare. No open inbound ports or firewall changes are required.

The [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) is an app that you install on each user's device. It routes traffic through Cloudflare and into the tunnel, so users can reach internal resources from anywhere.

## Prerequisites

* A Cloudflare account with a Zero Trust organization. If you have not set this up, refer to [Get started](https://developers.cloudflare.com/cloudflare-one/setup/).
* A Linux, Windows, or macOS device on your private network to run the tunnel.
* A Linux, Windows, or macOS device to install the Cloudflare One Client on.

## Step 1: Assign a Tunnel

Cloudflare Tunnel establishes an outbound connection between your resources and Cloudflare. This is how new devices can reach your private network. You can install Tunnel on any Windows, Mac, or Linux device currently in your private network.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), select the **Get Started** tab.
2. For **Replace my client-based or site-to-site VPN**, select **Get started**.
3. For **Device to network**, select **Continue**.
4. On the **Connect a remote device to a private network** screen, select **Continue**.
5. On the **Assign a Tunnel** screen, use the dropdown to choose an existing tunnel or create a new one.
6. Select **Continue**.

## Step 2: Set your Tunnel's IP range

Add the IP range of your private network to the tunnel. This defines which internal resources your remote users can reach. Your tunnel accepts traffic to this range from devices enrolled in your Zero Trust organization.

1. Enter your IP range (for example, `10.0.1.0/24`).
2. Select **Continue**.

Note

If you are not sure of your IP range, check your router or network settings.

## Step 3: Deploy your Tunnel

Install the `cloudflared` connector on a device in your private network and run the tunnel. This service creates the secure connection between your network and Cloudflare.

1. Select your device's operating system and architecture.
2. Copy the install command and run it on your device. For Windows, open Command Prompt as an administrator. For all other operating systems, use a terminal window.  
For macOS, the command looks similar to:  
Terminal window  
```  
brew install cloudflared && sudo cloudflared service install <YOUR_TUNNEL_TOKEN>  
```  
For Windows and Linux, the dashboard provides a download link and install command for your selected architecture. For more download options, refer to [Downloads](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/).
3. After `cloudflared` connects, the dashboard confirms the tunnel is active.
4. Select **Continue**.

## Step 4: Enroll your devices

Device enrollment controls which users can connect their devices to your private network through Cloudflare. In this step, you register your first device by providing an email address and installing the Cloudflare One Client.

1. Enter the email you want to use to enroll your first device.
2. Select your device's operating system.
3. Select **Download to continue** to download the Cloudflare One Client, or copy the download link to send to a different device.
4. Select **Continue**.

Note

You can manage device enrollment permissions later in **Team & Resources** \> **Devices**.

## Step 5: Complete Cloudflare One Client setup

On your device, complete the Cloudflare One Client installation wizard. Then connect the Cloudflare One Client to your Zero Trust organization. For comprehensive OS-specific instructions, refer to [Manual deployment](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/).

1. Open the Cloudflare One Client. On macOS, select the Cloudflare icon in your status bar. On Windows, select the Cloudflare icon in your system tray.
2. Go to **Preferences** \> **Account** \> **Login to Cloudflare Zero Trust**.
3. Enter your team name when prompted. Your team name is the unique identifier for your Zero Trust organization and was set when the organization was created. The dashboard displays your team name on this screen for easy reference.  
Note  
To find or change your team name, go to **Settings** \> **Team name** and select **Edit**.
4. Complete the authentication steps.
5. The Cloudflare One Client should show as **Connected**.
6. Select **Continue** in the dashboard.

## Step 6: Verify your connection

The dashboard confirms that you are securely connected. You now have remote access between your device and your private network resources.

To verify connectivity, try reaching a resource on your private network (for example, `http://10.0.1.100` or `ssh 10.0.1.50`).

## Recommended next steps

After verifying your connection, consider securing your private network with policies and access controls:

* **Set up Gateway policies**: By default, all enrolled devices can reach your entire private network. Gateway policies let you scan, filter, and log traffic between your devices and your private network. For more information, refer to [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/), [Network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/), and [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/).
* **Create an Access application**: Restrict access to specific applications or hostnames on your private network with identity-based rules. For more information, refer to [Secure a private IP or hostname](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/).
* **Explore more with Zero Trust**: Review your tunnel, policies, and connected devices in the [Cloudflare One dashboard ↗](https://one.dash.cloudflare.com).

For in-depth guidance on policy design and device posture checks, refer to the [Replace your VPN learning path](https://developers.cloudflare.com/learning-paths/replace-vpn/concepts/).

## Troubleshoot

If you have issues connecting, refer to these resources:

* [Troubleshoot WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/): resolve Cloudflare One Client connection and enrollment issues.
* [Troubleshoot tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/): diagnose tunnel connectivity and routing problems.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/setup/replace-vpn/device-to-network/#page","headline":"Device to network · Cloudflare One docs","description":"Connect a remote device to a private network using Cloudflare Tunnel and the Cloudflare One Client.","url":"https://developers.cloudflare.com/cloudflare-one/setup/replace-vpn/device-to-network/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-03-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/setup/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/setup/replace-vpn/","name":"Replace your VPN"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/setup/replace-vpn/device-to-network/","name":"Device to network"}}]}
```
