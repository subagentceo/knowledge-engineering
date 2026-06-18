---
title: Connect to SSH with client-side cloudflared
description: Connect to SSH with client-side cloudflared in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to SSH with client-side cloudflared

End users can connect to an SSH server without the Cloudflare One Client by authenticating through `cloudflared` in their native terminal. This method requires having `cloudflared` installed on both the server machine and on the client machine, as well as an active zone on Cloudflare. The traffic is proxied over this connection, and the user logs in to the server with their Cloudflare Access credentials.

Client-side `cloudflared` can be used in conjunction with [the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-device-client/) and [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) so that there are multiple ways to connect to the server. You can reuse the same Cloudflare Tunnel when configuring each connection method.

## 1\. Connect the server to Cloudflare

1. Create a Cloudflare Tunnel by following our [dashboard setup guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).
2. In the **Published application routes** tab, choose a domain from the drop-down menu and specify any subdomain (for example, `ssh.example.com`).
3. For **Service**, select _SSH_ and enter `localhost:22`. If the SSH server is on a different machine from where you installed the tunnel, enter `<server IP>:22`.
4. Select **Save**.
5. (Recommended) Add a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) to Cloudflare Access in order to manage access to your server.

## 2\. Connect as a user

1. [Install cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) on the client machine.
2. Make a one-time change to your SSH configuration file:  
Terminal window  
```  
vim ~/.ssh/config  
```
3. Input the following values; replacing `ssh.example.com` with the hostname you created.  
```  
Host ssh.example.com  
ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h  
```  
The `cloudflared` path may be different depending on your OS and package manager. For example, if you installed `cloudflared` on macOS with Homebrew, check its path by running `brew --prefix cloudflared`.
4. You can now test the connection by running a command to reach the service:  
Terminal window  
```  
ssh <username>@ssh.example.com  
```  
When the command is run, `cloudflared` will launch a browser window to prompt you to authenticate with your identity provider before establishing the connection from your terminal.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-cloudflared-authentication/#page","headline":"Connect to SSH with client-side cloudflared · Cloudflare One docs","description":"Connect to SSH with client-side cloudflared in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-cloudflared-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/","name":"SSH"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-cloudflared-authentication/","name":"Connect to SSH with client-side cloudflared"}}]}
```
