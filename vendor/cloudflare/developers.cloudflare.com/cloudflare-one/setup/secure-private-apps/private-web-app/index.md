---
title: Private web application
description: Connect a private web application to Cloudflare and protect it with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Private web application

Connect a self-hosted web application to Cloudflare so authorized users can access it from a browser without a VPN. This is useful when you need to give employees or contractors secure access to applications like company intranets, internal wikis, or admin panels.

To explore other access scenarios, refer to [Secure private apps](https://developers.cloudflare.com/cloudflare-one/setup/secure-private-apps/).

This guide follows the same steps as the **Get Started** experience in the [Cloudflare One dashboard ↗](https://one.dash.cloudflare.com).

## How it works

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) connects your private network to Cloudflare without opening any ports on your network. You install `cloudflared`, a connector service that runs in the background, on a device that can reach your application. It creates a secure connection from your network out to Cloudflare, so no firewall changes are required.

[Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/) sits in front of the application and verifies who each user is before letting them through. Users sign in through a browser using an email one-time PIN or your identity provider.

## Prerequisites

* A Cloudflare account with a Zero Trust organization. If you have not set this up, refer to [Get started](https://developers.cloudflare.com/cloudflare-one/setup/).
* An [active domain on your Cloudflare account](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/). A public subdomain is created on this domain for your application.
* A Linux, Windows, or macOS device on your private network that can reach the application. This is where you install the tunnel.
* A running web application on your private network (for example, `http://10.10.1.25` or `http://grafana.local`).

## Step 1: Define your application

In this step, you describe the internal application you want to make available through Cloudflare.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), select the **Get Started** tab.
2. For **Set up secure access to private apps from any browser**, select **Get started**.
3. For **Connect a private web application**, select **Continue**.
4. On the **Connect and access private web applications** screen, select **Continue**.
5. Enter a name for your application (for example, `grafana-gcp`).
6. Enter the hostname or IP address where the application is running. Use the IP address if you are not sure (for example, `10.10.1.25`).
7. Select the protocol your application uses (HTTP or HTTPS).
8. Enter the port your application listens on. This is usually part of the URL you use to access the application locally (for example, the `80` in `http://10.10.1.25:80`).
9. Select **Continue**.

## Step 2: Select a public domain

Your application needs a public URL so users can reach it from a browser. Cloudflare creates a public URL on one of your existing domains for the application.

1. Select a domain from the dropdown.
2. Enter a subdomain (for example, `grafana`). A preview of the full URL appears (for example, `grafana.example.com`).
3. Select **Continue**.

## Step 3: Add your first policy

An Access policy controls who can reach your application. In this step, you create a simple policy using email-based one-time PINs. Users you add here receive a one-time PIN by email when they try to access the application.

1. Enter the email addresses of users you want to grant access to.
2. Select **Continue**.

Note

You can add your identity provider (for example, Okta or Google Workspace) to the application later. For more information, refer to [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).

## Step 4: Assign a tunnel

A tunnel connects your private network to Cloudflare so traffic can reach your application. You can select an existing tunnel or create a new one.

1. In the **Choose or create a Tunnel** dropdown, select an existing tunnel or enter a name to create a new one.
2. Select **Continue**.

## Step 5: Deploy your tunnel

Install `cloudflared` on a device in your private network that can reach the application. The dashboard generates commands specific to your operating system.

1. Select your operating system from the dropdown.
2. Copy and run the commands shown in the dashboard. For Windows, open Command Prompt as an administrator. For all other operating systems, use a terminal window.
3. After the tunnel connects, select **Continue**.

## Step 6: Review details

The dashboard confirms that your application is available and protected behind Cloudflare Access.

## Recommended next steps

* **Test your application**:  
   1. Select **Test login** on the success screen.  
   2. On the Access login screen, enter one of the email addresses you added to your Access policy.  
   3. Select **Send me a code**.  
   4. Enter the code from your email and select **Sign in**.
* **Explore more with Zero Trust**: Review your applications and policies in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Access controls**, and your tunnels under **Zero Trust** \> **Networks** \> **Connectors**.
* **Configure an identity provider**: Replace email one-time PINs with your organization's identity provider for a seamless login experience. For more information, refer to [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).

For in-depth guidance on clientless access, refer to the [Clientless access learning path](https://developers.cloudflare.com/learning-paths/clientless-access/concepts/what-is-clientless-access/).

## Troubleshoot

If you have issues connecting, refer to these resources:

* [Troubleshoot tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/): diagnose tunnel connectivity and routing problems.
* [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/troubleshooting/): resolve common Zero Trust errors and issues.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/setup/secure-private-apps/private-web-app/#page","headline":"Private web application · Cloudflare One docs","description":"Connect a private web application to Cloudflare and protect it with Access.","url":"https://developers.cloudflare.com/cloudflare-one/setup/secure-private-apps/private-web-app/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-03-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/setup/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/setup/secure-private-apps/","name":"Secure private apps"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/setup/secure-private-apps/private-web-app/","name":"Private web application"}}]}
```
