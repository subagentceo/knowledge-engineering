---
title: Update cloudflared
description: Update cloudflared in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Update cloudflared

Updates will cause `cloudflared` to restart which will impact traffic currently being served. You can perform zero-downtime upgrades by using Cloudflare's [Load Balancer product](#update-with-cloudflare-load-balancer) or by using [multiple cloudflared instances](#update-with-multiple-cloudflared-instances).

## Update the `cloudflared` service

Refer to the following commands to update `cloudflared` for a remotely-managed tunnel or a locally-managed tunnel. Locally-managed tunnels must be set up to [run as a service](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/) for the following commands to execute successfully.

* [ Windows ](#tab-panel-7274)
* [ macOS ](#tab-panel-7275)
* [ Debian ](#tab-panel-7276)
* [ Red Hat ](#tab-panel-7277)
* [ Docker ](#tab-panel-7278)
* [ Other ](#tab-panel-7279)

Run the following command:

PowerShell

```

cloudflared update


```

After running `cloudflared update` to update `cloudflared`, you must restart the service for it to take effect. Run:

PowerShell

```

net start cloudflared


```

1. Update the `cloudflared` package:

Terminal window

```

brew upgrade cloudflared


```

1. Restart the service:

Terminal window

```

sudo launchctl stop com.cloudflare.cloudflared

sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

sudo launchctl start com.cloudflare.cloudflared


```

**If installed via apt:**

1. Update the `cloudflared` package:

Terminal window

```

sudo apt-get update && sudo apt-get install --only-upgrade cloudflared


```

1. Restart the service:

Terminal window

```

sudo systemctl restart cloudflared.service


```

**If installed via `dpkg -i`:**

Use the following commands if you installed `cloudflared` using the `dpkg` package manager. 

You can check if `cloudflared` was installed by a package manager by running `ls -la /usr/local/etc/cloudflared/` and looking for `.installedFromPackageManager` in the output.

1. Update the `cloudflared` package:

Terminal window

```

curl --location --output cloudflared.deb "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-$(dpkg --print-architecture).deb" && sudo dpkg -i cloudflared.deb


```

1. Restart the service:

Terminal window

```

sudo systemctl restart cloudflared.service


```

1. Update the `cloudflared` package:

Terminal window

```

sudo yum update cloudflared


```

1. Restart the service:

Terminal window

```

sudo systemctl restart cloudflared.service


```

**If you created a remotely-managed tunnel using the dashboard:**

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select your tunnel and select **Edit**.
3. Select **Docker** and copy the installation command shown in the dashboard. The copied command will contain your token.
4. Paste this command into a terminal window.

This command creates a new container from the latest `cloudflared` image. You can now delete the old container.

Warning

Cloudflare recommends creating remotely-managed tunnels when working with Docker.

**If you created a remotely or locally-managed tunnel using the API, run the following command:**

Terminal window

```

docker run --pull always cloudflare/cloudflared:latest tunnel --no-autoupdate run --token <TOKEN>


```

**If you created a locally-managed tunnel using the CLI:**

1. Mount your local `.cloudflared` directory into the Docker container using a volume.
2. Run the following command to update `cloudflared`:  
Terminal window  
```  
docker run --pull always -v <PATH-TO-YOUR-LOCAL-CLOUDFLARED>:/home/nonroot/.cloudflared cloudflare/cloudflared:latest tunnel --no-autoupdate run <TUNNEL-ID>  
```

If you installed `cloudflared` from GitHub-provided binaries or from source, run the following command:

Terminal window

```

cloudflared update


```

If you installed `cloudflared` with a package manager, you must update it using the same package manager. 

You can check if `cloudflared` was installed by a package manager by running `ls -la /usr/local/etc/cloudflared/` and looking for `.installedFromPackageManager` in the output.

## Update with Cloudflare Load Balancer

You can update `cloudflared` without downtime by using Cloudflare's Load Balancer product with your Cloudflare Tunnel deployment.

1. Install a new instance of `cloudflared` and [create](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/) a new Tunnel.
2. Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3. [Add the address](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/) of the new instance of `cloudflared` into your Load Balancer pool as priority 2.
4. Swap the priority such that the new instance is now priority 1 and monitor to confirm traffic is being served.
5. Once confirmed, you can remove the older version from the Load Balancer pool.

## Update with multiple `cloudflared` instances

If you are not using Cloudflare's Load Balancer, you can use multiple instances of `cloudflared` to update without the risk of downtime.

1. Install a new instance of `cloudflared` and [create](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/) a new Tunnel.
2. Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3. In the Cloudflare DNS dashboard, [replace](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/) the address of the current instance of `cloudflared` with the address of the new instance. Save the record.
4. Remove the now-inactive instance of `cloudflared`.

Traffic handling

When the old replica is stopped, it will drop long-lived HTTP requests (for example, WebSocket) and TCP connections (for example, SSH). UDP flows will also be dropped, as they are modeled based on timeouts. When the new replica connects, it will handle all new traffic, including new HTTP requests, TCP connections, and UDP flows.

### Run multiple instances in Windows

Windows systems require services to have a unique name and display name. You can run multiple instances of `cloudflared` by creating `cloudflared` services with unique names.

1. Install and configure `cloudflared`.
2. Next, create a service with a unique name and point to the `cloudflared` executable and configuration file.

PowerShell

```

sc.exe create <unique-name> binPath='<path-to-exe>' --config '<path-to-config>' displayname="Unique Name"


```

1. Proceed to create additional services with unique names.
2. You can now start each unique service.

PowerShell

```

sc.exe start <unique-name>


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/#page","headline":"Update cloudflared · Cloudflare One docs","description":"Update cloudflared in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CLI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/","name":"Downloads"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/","name":"Update cloudflared"}}]}
```
