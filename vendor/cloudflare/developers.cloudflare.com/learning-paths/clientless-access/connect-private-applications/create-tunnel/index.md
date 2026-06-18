---
title: Create a Cloudflare Tunnel
description: Create a tunnel to connect private applications.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a Cloudflare Tunnel

To enable clientless access to your applications, you will need to create a Cloudflare Tunnel that publishes applications to a domain on Cloudflare. A published application creates a public DNS record that routes traffic to a specific address, protocol, and port associated with a private application. For example, you can define a public hostname (`mywebapp.example.com`) to provide access to a web server running on `https://localhost:8080`. When a user goes to `mywebapp.example.com` in their browser, their request will first route to a Cloudflare data center where it is inspected against your configured security policies. Cloudflare will then forward validated requests down your tunnel to the web server.

![How an HTTP request reaches a private application connected with Cloudflare Tunnel](https://developers.cloudflare.com/_astro/handshake.eh3a-Ml1_26dKUX.webp) 

## Create a tunnel

To create a Cloudflare Tunnel:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. Choose **Cloudflared** for the connector type and select **Next**.
4. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).
5. Select **Save tunnel**.
6. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.
7. Once the command has finished running, your connector will appear in Cloudflare One.  
![Connector appearing in the UI after cloudflared has run](https://developers.cloudflare.com/_astro/connector.BnVS4T_M_ZxLFu6.webp)
8. Select **Next**.

## Publish an application

To add a published application when creating a new tunnel:

1. Go to the **Published applications** tab.
2. Enter a subdomain and select a **Domain** from the drop-down menu. Specify any subdomain or path information.  
Note  
If you add a multi-level subdomain (more than one level of subdomain), you must [order an Advanced Certificate for the hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#i-see-this-site-cant-provide-a-secure-connection).
3. Under **Service**, choose a [service type](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/protocols/) and specify its URL. For example,  
   * **Type**: _HTTP_  
   * **URL**: `localhost:8000`
4. Under **Additional application settings**, specify any [parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/) you would like to add to your tunnel configuration.  
![Example of a published application route in the Cloudflare One dashboard](https://developers.cloudflare.com/_astro/published-app.CZQbD1Bb_ZFOOUB.webp)
5. Select **Save**.

All users on the Internet can now connect to this application via its public hostname. In [Module 4: Secure your applications](https://developers.cloudflare.com/learning-paths/clientless-access/access-application/), we will discuss how to restrict access to authorized users.

Note

If the tunnel is disconnected:

* Ensure that your on-premise or cloud firewall allows egress traffic on the [required ports](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/#required-for-tunnel-operation).
* Ensure that the `cloudflared` host machine can connect to your internal applications and services. Verify that the host has the proper security group memberships and that no firewalls will block traffic between the host and the target services.

## Additional resources

For more control over how traffic routes through your tunnel, refer to the following links:

* [DNS records](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/)
* [Load balancer](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/connect-private-applications/create-tunnel/#page","headline":"Create a Cloudflare Tunnel · Cloudflare Learning Paths","description":"Create a tunnel to connect private applications.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/connect-private-applications/create-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/connect-private-applications/","name":"Connect your private applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/connect-private-applications/create-tunnel/","name":"Create a Cloudflare Tunnel"}}]}
```
