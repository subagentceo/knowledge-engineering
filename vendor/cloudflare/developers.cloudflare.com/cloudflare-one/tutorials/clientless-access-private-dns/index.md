---
title: Access a web application via its private hostname without the Cloudflare One Client
description: With Cloudflare Browser Isolation and resolver policies, users can connect to private web-based applications via their private hostnames.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access a web application via its private hostname without the Cloudflare One Client

**Last reviewed:**  over 2 years ago 

With Cloudflare Browser Isolation and resolver policies, users can connect to private web-based applications via their private hostnames without needing to install the Cloudflare One Client. By the end of this tutorial, users who pass your Gateway DNS and network policies will be able to access your private application at `https://<your-team-name>.cloudflareaccess.com/browser/https://internalrecord.com`.

## Before you begin

Make sure you have:

* [Cloudflare Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) enabled on your account
* [Resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) enabled on your account
* An HTTP or HTTPS application that users access through a browser

## Create a Cloudflare Tunnel

First, install `cloudflared` on a server in your private network:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. Choose **Cloudflared** for the connector type and select **Next**.
4. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).
5. Select **Save tunnel**.
6. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.
7. Once the command has finished running, your connector will appear in Cloudflare One.  
![Connector appearing in the UI after cloudflared has run](https://developers.cloudflare.com/_astro/connector.BnVS4T_M_ZxLFu6.webp)
8. Select **Next**.

## Add private network routes

1. In the **CIDR** tab, add the following IP addresses:  
   * Private IP/CIDR of your application server (for example, `10.128.0.175/32`)  
   * Private IP/CIDR of your DNS server
2. Select **Save tunnel**.

The application and DNS server are now connected to Cloudflare.

## Enable Clientless Web Isolation

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Browser isolation** \> **Browser isolation settings**.
2. Turn on **Allow users to open a remote browser without the device client**.
1. For **Permissions**, select **Manage**.
2. Select **Add a rule**.
3. Create an expression that defines who can open the Clientless Web Isolation browser. For example,  
| Rule action | Rule type | Selector         | Value        | Action           |  
| ----------- | --------- | ---------------- | ------------ | ---------------- |  
| Allow       | Include   | Emails ending in | @example.com | Select **Save**. |

To test, open a browser and go to `https://<team-name>.cloudflareaccess.com/browser/https://<private-IP-of-application>`.

## Create a Gateway resolver policy

1. Go to **Traffic policies** \> **Resolver policies**.
2. Select **Add a policy**.
3. Create an expression to match against the private [domain](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#domain) or [hostname](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#host) of the application:  
| Selector | Operator | Value              |  
| -------- | -------- | ------------------ |  
| Domain   | in       | internalrecord.com |
4. In **Select DNS resolver**, select _Configure custom DNS resolvers_.
5. Enter the private IP address of your DNS server.
6. In the dropdown menu, select _`<IP-address> - Private`_.
7. (Optional) Enter a custom port.
8. Select **Create policy**.

To test, open a browser and go to `https://<team-name>.cloudflareaccess.com/browser/https://internalrecord.com`.

## Create a Gateway network policy (recommended)

1. Go to **Traffic policies** \> **Firewall policies** \> **Network**.
2. Add a [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) that targets the private IP address of your application. You can optionally include any ports or protocols relevant for application access. For example,  
| Selector         | Operator      | Value          | Logic | Action |  
| ---------------- | ------------- | -------------- | ----- | ------ |  
| Destination IP   | in            | 10.128.0.175   | And   | Allow  |  
| Destination Port | in            | 80             | Or    |        |  
| User Email       | matches regex | .\*example.com |       |        |

Note

Device posture checks are not supported because they require the Cloudflare One Client.

For best practices on securing private applications, refer to [Build secure access policies](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/).

## Connect as a user

Users can now access the application at the following URL:

`https://<team-name>.cloudflareaccess.com/browser/https://internalrecord.com`

The application will load in an isolated browser. You can optionally [configure remote browser controls](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#policy-settings) such as disabling copy/paste, printing, or keyboard input.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/clientless-access-private-dns/#page","headline":"Access a web application via its private hostname without the Cloudflare One Client · Cloudflare One docs","description":"With Cloudflare Browser Isolation and resolver policies, users can connect to private web-based applications via their private hostnames.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/clientless-access-private-dns/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS","Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/clientless-access-private-dns/","name":"Access a web application via its private hostname without the Cloudflare One Client"}}]}
```
