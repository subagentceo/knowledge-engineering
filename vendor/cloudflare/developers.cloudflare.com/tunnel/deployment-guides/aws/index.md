---
title: AWS
description: Deploy Cloudflare Tunnel on Amazon Web Services.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AWS

This guide covers how to connect an Amazon Web Services (AWS) EC2 instance to Cloudflare using `cloudflared` and publish a web application through a Cloudflare Tunnel.

### Prerequisites

* [Add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)

## 1\. Create an EC2 instance

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

## 2\. Create a tunnel

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** \> **Tunnels**.
2. Select **Create Tunnel** and enter a name (for example, `aws-tunnel`).
3. Select **Create Tunnel**.
4. Under **Setup Environment**, select **Debian 64-bit**.
5. Copy the install commands and run them on your EC2 instance.
6. Once the tunnel connects, select **Continue**.

## 3\. Publish an application

1. Under **Routes**, select **Add route** \> **Published application**.
2. Enter a hostname (for example, `hellocloudflare.<your-domain>.com`).
3. Under **Service**, enter `http://localhost:80`.
4. Select **Add route**.

To test, open a browser and go to the hostname you configured. You should see your web server's page.

Looking for private network access?

To connect to your EC2 instance via private IP using the Cloudflare One Client, refer to the [Cloudflare One Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/).

## Firewall configuration

To secure your AWS instance, you can configure your [Security Group rules ↗](https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html) to deny all inbound traffic and allow only outbound traffic to the [Cloudflare Tunnel IP addresses](https://developers.cloudflare.com/tunnel/configuration/#required-ports). All Security Group rules are Allow rules; traffic that does not match a rule is blocked. Therefore, you can delete all inbound rules and leave only the relevant outbound rules.

Note

If you delete the inbound rule for port `22`, you will be unable to SSH back into the instance.

After configuring your Security Group rules, verify that you can still access the service through Cloudflare Tunnel via its [public hostname](#3-publish-an-application). The service should no longer be accessible from outside Cloudflare Tunnel -- for example, if you go to `http://ec2-44-202-59-16.compute-1.amazonaws.com` the test page should no longer load.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/deployment-guides/aws/#page","headline":"Deploy cloudflared in AWS · Cloudflare Docs","description":"Deploy Cloudflare Tunnel on Amazon Web Services.","url":"https://developers.cloudflare.com/tunnel/deployment-guides/aws/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AWS","Integration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/deployment-guides/","name":"Deployment guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/deployment-guides/aws/","name":"AWS"}}]}
```
