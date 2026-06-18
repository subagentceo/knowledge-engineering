---
title: Access and secure a MySQL database using Cloudflare Tunnel and network policies
description: Using Cloudflare Tunnel's private networks, users can connect to arbitrary non-browser based TCP/UDP applications, like databases. You can set up network policies that implement zero trust controls to define who and what can access those applications using the Cloudflare One Client.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access and secure a MySQL database using Cloudflare Tunnel and network policies

**Last reviewed:**  over 2 years ago 

Using Cloudflare Tunnel's private networks, users can connect to arbitrary non-browser based TCP/UDP applications, like databases. You can set up network policies that implement zero trust controls to define who and what can access those applications using the Cloudflare One Client.

By the end of this tutorial, users that pass network policies will be able to access a remote MySQL database available through a Cloudflare Tunnel on TCP port 3306.

## Before you begin

Make sure you have:

* A MySQL database listening for remote connections and configured with users that can connect remotely
* (Optional)[Resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) enabled on your account

## Create a Cloudflare Tunnel

Install `cloudflared` on a server in your private network. This server should have connectivity to the MySQL database.

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
* Private IP/CIDR of your MySQL server (for example, `10.128.0.175/32`)
* (Optional) Private IP/CIDR of your internal DNS server
1. Select **Save tunnel**.

The application and (optional) DNS server are now connected to Cloudflare.

## Create a Gateway network policy

1. Go to **Traffic policies** \> **Network policies**.
2. Add a [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) that targets the private IP address and the port of the MySQL database (port 3306 by default). The following example allows access to the database to the users that enrolled into the Cloudflare One Client using an `@example.com` email address. The network policies can also take into consideration [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

| Selector         | Operator      | Value          | Logic | Action |
| ---------------- | ------------- | -------------- | ----- | ------ |
| Destination IP   | in            | 10.128.0.175   | And   | Allow  |
| Destination Port | in            | 3306           | And   |        |
| User Email       | matches regex | .\*example.com |       |        |

In addition to the Allow rule above, Cloudflare recommends adding a [catch-all block policy](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/) to the bottom of your network policy list to enforce a default-deny model.

Allowed Cloudflare One Client users can now connect to the MySQL server at `10.128.0.175` using the MySQL client of their choice.

## (Optional) Create a Gateway resolver policy

To allow users to access the MySQL database using an internal hostname instead of the private IP address, configure a Gateway resolver policy.

1. Go to **Traffic policies** \> **Resolver policies**.
2. Select **Add a policy**.
3. Create an expression to match against the private [domain](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#domain) or [hostname](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#host) of the application, like in the following example:  
| Selector | Operator | Value              |  
| -------- | -------- | ------------------ |  
| Domain   | in       | internalrecord.com |
4. In **Select DNS resolver**, select _Configure custom DNS resolvers_.
5. Enter the private IP address of your DNS server.
6. In the dropdown menu, select _`<IP-address> - Private`_.
7. (Optional) Enter a custom port.
8. Select **Create policy**.

If your internal DNS server has an `A` record for the MySQL database, users can connect to the server using this record. For example, assuming a BIND server that includes the entry:

`mysql IN A 10.128.0.175`

Allowed Cloudflare One Client users can connect to the MySQL database at `mysql.internalrecord.com` using the MySQL client of their choice.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/mysql-network-policy/#page","headline":"Access and secure a MySQL database using Cloudflare Tunnel and network policies · Cloudflare One docs","description":"Using Cloudflare Tunnel's private networks, users can connect to arbitrary non-browser based TCP/UDP applications, like databases. You can set up network policies that implement zero trust controls to define who and what can access those applications using the Cloudflare One Client.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/mysql-network-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MySQL","Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/mysql-network-policy/","name":"Access and secure a MySQL database using Cloudflare Tunnel and network policies"}}]}
```
