---
title: GCP
description: Deploy Cloudflare Tunnel on Google Cloud Platform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GCP

This guide covers how to connect a Google Cloud Platform (GCP) virtual machine to Cloudflare using `cloudflared` and publish a web application through a Cloudflare Tunnel.

### Prerequisites

* [A Google Cloud Project ↗](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating%5Fa%5Fproject)
* [A zone on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)

## 1\. Create a VM instance

1. In your [Google Cloud Console ↗](https://console.cloud.google.com/), [create a new project ↗](https://developers.google.com/workspace/guides/create-project).
2. Go to **Compute Engine** \> **VM instances**.
3. Select **Create instance**.
4. Name your VM instance. In this example we will name it `http-test-server`.
5. Choose your desired operating system and specifications. For this example, you can use the following settings:  
   * **Machine family:** General Purpose  
   * **Series:** E2  
   * **Machine type:** e2-micro  
   * **Boot disk image:** Debian GNU/Linux 12  
   * **Firewalls**: Allow HTTP and HTTPS traffic
6. Under **Advanced options** \> **Management** \> **Automation**, add the following startup script. This example deploys a basic Apache web server on port `80`.  
```  
#!/bin/bash  
apt update  
apt -y install apache2  
cat <<EOF > /var/www/html/index.html  
<html><body><h1>Hello Cloudflare!</h1>  
<p>This page was created for a Cloudflare demo.</p>  
</body></html>  
EOF  
```
7. Select **Create**.
8. The operating system automatically starts the Apache HTTP server. To verify that the server is running:  
   1. Copy the **External IP** for the VM instance.  
   2. Open a browser and go to `http://<EXTERNAL IP>`. You should see the **Hello Cloudflare!** test page.
9. To login to the VM instance, open the dropdown next to **SSH** and select _Open in browser window_.

## 2\. Create a tunnel

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** \> **Tunnels**.
2. Select **Create Tunnel** and enter a name (for example, `gcp-tunnel`).
3. Select **Create Tunnel**.
4. Under **Setup Environment**, select **Debian 64-bit**.
5. SSH into your VM and run the install commands shown in the dashboard.
6. Once the tunnel connects, select **Continue**.

## 3\. Publish an application

1. Under **Routes**, select **Add route** \> **Published application**.
2. Enter a hostname (for example, `hellocloudflare.<your-domain>.com`).
3. Under **Service**, enter `http://localhost:80`.
4. Select **Add route**.

To test, open a browser and go to the hostname you configured.

You can optionally add [Cloudflare Access](https://developers.cloudflare.com/tunnel/integrations/#cloudflare-access) to control who can reach the service.

Looking for private network access?

To connect to your VM via private IP using the Cloudflare One Client, refer to the [Cloudflare One Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/).

## Firewall configuration

To secure your VM instance, you can [configure your VPC firewall rules ↗](https://cloud.google.com/firewall/docs/using-firewalls) to deny all ingress traffic and allow only egress traffic to the [Cloudflare Tunnel IP addresses](https://developers.cloudflare.com/tunnel/configuration/#required-ports). Since GCP denies ingress traffic by [default ↗](https://cloud.google.com/firewall/docs/firewalls#default%5Ffirewall%5Frules), you can delete all ingress rules and leave only the relevant egress rules.

Note

If you delete the default `allow-ssh` rule, you will be unable to SSH back into the VM.

After configuring your VPC firewall rules, verify that you can still access the service through Cloudflare Tunnel via its [public hostname](#3-publish-an-application). The service should no longer be accessible from outside Cloudflare Tunnel -- for example, if you go to `http://<EXTERNAL IP>` the test page should no longer load.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/deployment-guides/google-cloud-platform/#page","headline":"GCP · Cloudflare Docs","description":"Deploy Cloudflare Tunnel on Google Cloud Platform.","url":"https://developers.cloudflare.com/tunnel/deployment-guides/google-cloud-platform/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GCP","Integration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/deployment-guides/","name":"Deployment guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/deployment-guides/google-cloud-platform/","name":"GCP"}}]}
```
