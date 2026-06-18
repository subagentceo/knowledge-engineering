---
title: AWS
description: AWS in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AWS

This guide covers how to connect an Amazon Web Services (AWS) virtual machine to Cloudflare using our lightweight connector, `cloudflared`.

We will deploy:

* An EC2 virtual machine that runs a basic HTTP server.
* A Cloudflare Tunnel that allows users to connect to the service via either a public hostname or a private IP address.

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connectivity pre-checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

### Prerequisites

To complete the following procedure, you will need to:

* [Add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)
* [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) on an end-user device

## 1\. Create a VM instance in AWS

1. From the AWS console, go to **Compute** \> **EC2** \> **Instances**
2. Select **Launch instance**.
3. Name your VM instance. In this example we will name it `http-test-server`.
4. For \*_Amazon Machine Image (AMI)_ choose your desired operating system and specifications. For this example, we will use _Ubuntu Server 24.04 LTS (HVM), SSD Volume Type_.
5. For **Instance type:**, you can select _t2.micro_ which is available on the free tier.
6. In **Key pair (login)**, create a new key pair to use for SSH. You will need to download the `.pem` file onto your local machine.
7. In **Network settings**, select **Create security group**.
8. Turn on the following Security Group rules:  
   * **Allow SSH traffic from _My IP_** to prevent the instance from being publicly accessible.  
   * **Allow HTTPS traffic from the internet**  
   * **Allow HTTP traffic from the internet**
9. Select **Launch instance**.
10. Once the instance is up and running, go to the **Instances** summary page and copy its **Public IPv4 DNS** hostname (for example, `ec2-44-202-59-16.compute-1.amazonaws.com`).
11. To log in to the instance over SSH, open a terminal and run the following commands:

Terminal window

```

cd Downloads


```

Terminal window

```

chmod 400 "YourKeyPair.pem"


```

Terminal window

```

ssh -i "YourKeyPair.pem" ubuntu@ec2-44-202-59-16.compute-1.amazonaws.com


```

1. Run `sudo su` to gain full admin rights to the instance.
2. For testing purposes, you can deploy a basic Apache web server on port `80`:

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

1. To verify that the Apache server is running, open a browser and go to `http://ec2-44-202-59-16.compute-1.amazonaws.com` (make sure to connect over `http`, not `https`). You should see the **Hello Cloudflare!** test page.

## 2\. Create a Cloudflare Tunnel

Create a Cloudflare Tunnel in Cloudflare One and run the tunnel on the AWS instance.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. Choose **Cloudflared** for the connector type and select **Next**.
4. Enter a name for your tunnel (for example, `aws-tunnel`).
5. Select **Save tunnel**.
6. Under **Choose your environment**, select **Debian**. Copy the command shown in the dashboard and run it on your AWS instance.
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

[Private network routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) allow users to connect to your virtual private cloud (VPC) using the Cloudflare One Client. To add a private network route for your Cloudflare Tunnel:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Routes**.
2. In the **CIDR** tab, enter the **Private IP address** of your AWS instance (for example, `172.31.19.0`). You can expand the IP range later if necessary.
3. In your [Split Tunnel configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route), make sure the private IP is routing through the Cloudflare One Client. For example, if you are using Split Tunnels in **Exclude** mode, delete `172.16.0.0/12`. We recommend re-adding the IPs that are not explicitly used by your AWS instance.  
To determine which IP addresses to re-add, subtract your AWS instance IPs from `172.16.0.0/12`:  
**Base CIDR:** **Subtracted CIDRs:**  
Calculate  
Add the results back to your Split Tunnel Exclude mode list.
4. To test on a user device:  
   1. [Log in to the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/).  
   2. Open a terminal window and connect to the service using its private IP:  
Terminal window  
```  
curl 172.31.19.0  
```  
```  
<html><body><h1>Hello Cloudflare!</h1>  
<p>This page was created for a Cloudflare demo.</p>  
</body></html>  
```

You can optionally [create Gateway network policies](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#4-recommended-filter-network-traffic-with-gateway) to control who can access the AWS instance via its private IP.

Warning

Avoid configuring your [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) or [Resolver Policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to direct all `*.amazonaws.com` DNS resolution via AWS Route 53 Resolver.

Some AWS endpoints (such as `ssm.us-east-1.amazonaws.com`) are public AWS endpoints that are not resolvable via internal VPC resolution. This can break AWS Console features for users on the Cloudflare One Client.

Only route specific Route 53 zones, or VPC Endpoints (such as `vpce.amazonaws.com`), through the internal VPC resolver.

## Firewall configuration

To secure your AWS instance, you can configure your [Security Group rules ↗](https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html) to deny all inbound traffic and allow only outbound traffic to the [Cloudflare Tunnel IP addresses](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/#required-for-tunnel-operation). All Security Group rules are Allow rules; traffic that does not match a rule is blocked. Therefore, you can delete all inbound rules and leave only the relevant outbound rules.

Note

If you delete the inbound rule for port `22`, you will be unable to SSH back into the instance.

After configuring your Security Group rules, verify that you can still access the service through Cloudflare Tunnel via its [public hostname](#3-connect-using-a-public-hostname) or [private IP](#4-connect-using-a-private-ip). The service should no longer be accessible from outside Cloudflare Tunnel -- for example, if you go to `http://ec2-44-202-59-16.compute-1.amazonaws.com` the test page should no longer load.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/aws/#page","headline":"Deploy cloudflared in AWS · Cloudflare One docs","description":"AWS in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/aws/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AWS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/","name":"Environments"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/aws/","name":"AWS"}}]}
```
