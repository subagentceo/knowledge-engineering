---
title: Azure
description: Azure in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Azure

This guide covers how to connect an Azure Virtual Machine to Cloudflare using our lightweight connector, `cloudflared`.

We will deploy:

* An Azure VM that runs a basic HTTP server.
* A Cloudflare Tunnel that allows users to connect to the service via either a public hostname or a private IP address.

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connectivity pre-checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

### Prerequisites

To complete the following procedure, you will need to:

* [Add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)
* [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) on an end-user device

## 1\. Create a VM instance in Azure

1. In the Azure portal, go to **Virtual Machines** \> **Create** \> **Azure virtual machine**.
2. Select a **Resource group** or create a new one.  
![Azure group](https://developers.cloudflare.com/_astro/azure-1.f9lJ2gl2_Z9H61D.webp)
3. Enter a name for the VM and select a region. For **Image**, select _Ubuntu Server 24.04 LTS_. For **Size**, select an appropriate size (for example, _Standard\_B1s_).
4. Under **Administrator account**, select **SSH public key** and enter your key pair.  
![Azure keypair](https://developers.cloudflare.com/_astro/azure-2.TRbZo2Tb_28kqwy.webp)
5. Under **Inbound port rules**, allow SSH (`22`). For testing purposes, also allow HTTP (`80`) and HTTPS (`443`).  
![Azure ports](https://developers.cloudflare.com/_astro/azure-3.MZiED3ci_1bszbc.webp)
6. Select **Review + create**, then **Create**.
7. Once the VM is running, copy its **Public IP address** from the VM overview page. Also record the **Private IP address** — Azure by default uses the `10.0.0.0/8` subnet.
8. SSH into the instance:  
Terminal window  
```  
ssh -i "your-key.pem" azureuser@<PUBLIC_IP>  
```
9. Run `sudo su` to gain full admin rights to the VM.
10. For testing purposes, you can deploy a basic Apache web server on port `80`:  
Terminal window  
```  
apt update  
apt -y install apache2  
cat <<EOF > /var/www/html/index.html  
<html><body><h1>Hello Cloudflare!</h1>  
<p>This page was created for a Cloudflare demo.</p>  
</body></html>  
EOF  
```
11. To verify that the Apache server is running, open a browser and go to `http://<PUBLIC_IP>` (make sure to connect over `http`, not `https`). You should see the **Hello Cloudflare!** test page.

## 2\. Create a Cloudflare Tunnel

Create a Cloudflare Tunnel in Cloudflare One and run the tunnel on the Azure VM.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. Choose **Cloudflared** for the connector type and select **Next**.
4. Enter a name for your tunnel (for example, `azure-tunnel`).
5. Select **Save tunnel**.
6. Under **Choose your environment**, select **Debian**. Copy the command shown in the dashboard and run it on your Azure VM.
7. Once the command has finished running, your connector will appear in Cloudflare One.
8. Select **Next**.

## 3\. Connect using a public hostname

[Published applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) allow anyone on the Internet to connect to HTTP resources hosted on your virtual private cloud (VPC). To add a published application for your Cloudflare Tunnel:

1. In the **Published application routes** tab, enter a hostname for the application (for example, `hellocloudflare.<your-domain>.com`).
2. Under **Service**, enter `http://localhost:80`.
3. Select **Save**.
4. To test, open a browser and go to `http://hellocloudflare.<your-domain>.com`. You should see the **Hello Cloudflare!** test page.

You can optionally [create an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) to control who can access the service.

## 4\. Connect using a private IP

[Private network routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) allow users to connect to your Azure Virtual Network (VNet) using the Cloudflare One Client. To add a private network route for your Cloudflare Tunnel:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Routes**.
2. In the **CIDR** tab, enter the **Private IP address** of your Azure VM (for example, `10.0.0.4`). You can expand the IP range later if necessary.
3. In your [Split Tunnel configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route), make sure the private IP is routing through the Cloudflare One Client. For example, if you are using Split Tunnels in **Exclude** mode, delete `10.0.0.0/8`. We recommend re-adding the IPs that are not explicitly used by your Azure VM.  
To determine which IP addresses to re-add, subtract your Azure VM IPs from `10.0.0.0/8`:  
**Base CIDR:** **Subtracted CIDRs:**  
Calculate  
Add the results back to your Split Tunnel Exclude mode list.
4. To test on a user device:  
   1. [Log in to the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/).  
   2. Open a terminal window and connect to the service using its private IP:  
Terminal window  
```  
curl 10.0.0.4  
```  
```  
<html><body><h1>Hello Cloudflare!</h1>  
<p>This page was created for a Cloudflare demo.</p>  
</body></html>  
```

You can optionally [create Gateway network policies](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#4-recommended-filter-network-traffic-with-gateway) to control who can access the Azure VM via its private IP.

## Firewall configuration

To secure your Azure VM, you can configure your [Network Security Group (NSG) ↗](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview) to deny all inbound traffic and allow only outbound traffic to the [Cloudflare Tunnel IP addresses](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/#required-for-tunnel-operation). All NSG rules are evaluated by priority; traffic that does not match an allow rule is blocked by the default deny rules. Therefore, you can delete all custom inbound rules and leave only the relevant outbound rules.

Note

If you delete the inbound rule for port `22`, you will be unable to SSH back into the VM.

After configuring your NSG rules, verify that you can still access the service through Cloudflare Tunnel via its [public hostname](#3-connect-using-a-public-hostname) or [private IP](#4-connect-using-a-private-ip). The service should no longer be accessible from outside Cloudflare Tunnel — for example, direct access to the VM's public IP should no longer work.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/azure/#page","headline":"Deploy cloudflared in Azure · Cloudflare One docs","description":"Azure in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/azure/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Azure"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/","name":"Environments"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/azure/","name":"Azure"}}]}
```
