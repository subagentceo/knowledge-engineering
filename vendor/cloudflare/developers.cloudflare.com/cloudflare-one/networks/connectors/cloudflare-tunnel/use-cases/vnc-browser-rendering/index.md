---
title: Render a VNC client in the browser
description: Render a VNC client in the browser in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Render a VNC client in the browser

A Virtual Network Computer (VNC) server provides users with remote access to a computer's desktop environment. Cloudflare can render a VNC terminal in the browser without any client-side software or configuration.

Browser-rendered VNC requires connecting the VNC server to Cloudflare and routing traffic through a public hostname. To access the VNC server, users go to the public hostname URL and log in through Cloudflare Access using your configured identity provider. Cloudflare will apply your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) and, when a user is allowed, render a VNC client in their browser.

Note

There are a number of different VNC server versions, deployments, and instances. This guide uses TightVNC running an XFCE desktop, but browser-rendered VNC will work with most configurations.

## Prerequisites

* An [active domain on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
* The domain uses either a [full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or a [partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).

## 1\. Set up a VNC server

For demonstration purposes, we will create a TightVNC server on an Ubuntu virtual machine (VM) hosted in Google Cloud Project (GCP). We will configure the VNC server to run XFCE, a lightweight desktop environment suitable for remote access. If you already have a VNC server installed, you can skip this step and [go to Step 2](#2-connect-the-server-to-cloudflare).

1. Open a terminal window for your Ubuntu VM.
2. Install XFCE and TightVNC by running the following command:  
Terminal window  
```  
sudo apt update  
sudo apt install xfce4 xfce4-goodies dbus-x11 tightvncserver -y  
```  
This command installs the desktop, some helpful utilities, and the VNC server software.
3. To initialize the VNC server:  
   1. Create a VNC server instance:  
   Terminal window  
   ```  
   vncserver  
   ```  
   2. You will be prompted to set a password. This password will be used to connect to your VNC server. It is limited to 8 characters.  
   TightVNC will now create configuration files and start a VNC session on display `:1` (which uses port `5901`).  
   3. You will be asked if you want to create a view-only password. You can press `n` for no.  
   4. Kill this initial session so that you can edit its configuration:  
   Terminal window  
   ```  
   vncserver -kill :1  
   ```
4. Configure VNC to launch the XFCE desktop:  
   1. Create a VNC configuration directory if it is missing:  
Terminal window  
```  
mkdir -p ~/.vnc  
```  
   1. Open the `xstartup` file using a text editor. For example,  
Terminal window  
```  
vim ~/.vnc/xstartup  
```  
   1. Update the file to the following configuration:  
```  
#!/bin/sh  
unset SESSION_MANAGER  
unset DBUS_SESSION_BUS_ADDRESS  
startxfce4  
```  
   1. Make the file executable:  
Terminal window  
```  
chmod +x ~/.vnc/xstartup  
```
5. Start the VNC server again:  
Terminal window  
```  
vncserver -localhost :1  
```  
The `-localhost` flag ensures the VNC server only listens for connections from the VM itself, not from the public Internet. Your VNC server is now running on port `5901`, but it is only accessible from `localhost` (`127.0.0.1`) inside the VM.
6. (Recommended) Test the VNC server with an existing VNC client to verify any missing packages or configuration changes. For example, to test a VNC server hosted on GCP:  
   1. Open a terminal on the client machine.  
   2. Connect to the VNC server over SSH, forwarding your local port `5901` to the VNC server's listening port:  
   Terminal window  
   ```  
   gcloud compute ssh [YOUR_VM_NAME] --zone=[YOUR_ZONE] -- -L 5901:localhost:5901  
   ```  
   3. Open your preferred VNC viewer application.  
   4. In the VNC viewer, connect to the address `localhost:5901` and enter your VNC server password.  
You should see the Ubuntu VM desktop.
7. (Optional) Configure the VNC server to start on boot:  
   1. Find the full path to the `vncserver` command:  
   Terminal window  
   ```  
   which vncserver  
   ```  
   ```  
   /usr/bin/vncserver  
   ```  
   2. Create a new service configuration file:  
Terminal window  
```  
sudo vim /etc/systemd/system/vncserver@.service  
```  
   1. Copy and paste the following content. Replace `[YOUR_USERNAME]` with the VNC server user. If needed, update `/usr/bin/vncserver` to your `vncserver` path.  
   TOML  
   ```  
   [Unit]  
   Description=Start TightVNC server at startup  
   After=syslog.target network.target  
   [Service]  
   Type=forking  
   User=[YOUR_USERNAME]  
   WorkingDirectory=/home/[YOUR_USERNAME]  
   PIDFile=/home/[YOUR_USERNAME]/.vnc/%H:%i.pid  
   ExecStartPre=-/usr/bin/vncserver -kill :%i > /dev/null 2>&1  
   ExecStart=/usr/bin/vncserver -localhost :%i  
   ExecStop=/usr/bin/vncserver -kill :%i  
   [Install]  
   WantedBy=multi-user.target  
   ```  
         1. Reload `systemd` to read in the new service file:  
   Terminal window  
   ```  
   sudo systemctl daemon-reload  
   ```  
         1. Enable the service to start at boot:  
   Terminal window  
   ```  
   sudo systemctl enable vncserver@1.service  
   ```  
   The `1` variable configures the VNC service to use display `:1` (which runs on port `5901`).  
         1. By default, `systemd` user services only run when that user is logged in. To allow your VNC service to start on boot (before you log in), enable user linger for your user:  
   Terminal window  
   ```  
   sudo loginctl enable-linger [YOUR_USERNAME]  
   ```  
         1. Start the service:  
   Terminal window  
   ```  
   sudo systemctl start vncserver@1.service  
   ```  
         1. Check its status:  
   Terminal window  
   ```  
   sudo systemctl status vncserver@1.service  
   ```  
   The VNC server will now start automatically every time the VM boots.

## 2\. Connect the server to Cloudflare

1. Create a Cloudflare Tunnel by following the [dashboard setup guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).
2. Go to **Networks** \> **Connectors**. Select your tunnel and select **Edit**.
3. Select the **Published application routes** tab, then select **Add a published application route**.
4. Choose a domain from the drop-down menu and specify any subdomain (for example, `vnc.example.com`).
5. For **Service**, select _TCP_ and enter `localhost:<5901>`. If the VNC server is on a different machine from where you installed the tunnel, enter `<SERVER_IP>:5901`.  
Replace `5901` with your VNC server's listening port. To determine your VNC listening port, run `sudo ss -lnpt` and look for `vnc` in the list of processes.
6. Save the route.

Your VNC server is now ready to accept inbound requests from Cloudflare.

## 3\. Create an Access application for VNC

Create a Cloudflare Access application that users can access through their browser:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **Self-hosted and private**.
4. Select **Add public hostname** and enter your published application hostname (`vnc.example.com`).
5. Turn on **Allow access through browser-based RDP, SSH, or VNC sessions**, then select _VNC_.
6. Under **Access policies**, add an existing policy or [create a new policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) to control who can connect to your application. All Access applications are deny by default -- a user must match an Allow policy before they are granted access.  
Note  
Ensure that only **Allow** or **Block** policies are present. **Bypass** and **Service Auth** are not supported for browser-rendered applications.
7. Select **Create**.

## 4\. Connect as a user

Users can now access the remote desktop environment directly in their web browser without installing any VNC client software.

To connect to the VNC server:

1. Open a browser and go to the public hostname URL (for example, `https://vnc.example.com`).
2. Log in to Cloudflare Access with your configured identity provider.
3. Enter the VNC server password.

You should see the remote VNC server desktop rendered in your browser. All connections are secured through Cloudflare's network, and access is controlled by your Access policies.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/vnc-browser-rendering/#page","headline":"Render a VNC client in the browser · Cloudflare One docs","description":"Render a VNC client in the browser in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/vnc-browser-rendering/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GCP","Linux"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/vnc-browser-rendering/","name":"Render a VNC client in the browser"}}]}
```
