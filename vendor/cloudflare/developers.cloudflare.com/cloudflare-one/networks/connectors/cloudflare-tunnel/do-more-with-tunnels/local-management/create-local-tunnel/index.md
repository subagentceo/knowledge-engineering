---
title: Create a locally-managed tunnel
description: Create a locally-managed tunnel in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a locally-managed tunnel

Follow this step-by-step guide to get your first tunnel up and running using the CLI.

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connectivity pre-checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

## Prerequisites

Before you start, make sure you:

* [Add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
* [Change your domain nameservers to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/).

## 1\. Download and install `cloudflared`

* [ Windows ](#tab-panel-7270)
* [ macOS ](#tab-panel-7271)
* [ Linux ](#tab-panel-7272)
* [ Build from source ](#tab-panel-7273)

1. Download `cloudflared` on your machine. Visit the [downloads](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) page to find the right package for your OS.
2. Rename the executable to `cloudflared.exe`
3. In PowerShell, change directory to your Downloads folder and run `.\cloudflared.exe --version`. It should output the version of `cloudflared`. Note that `cloudflared.exe` could be `cloudflared-windows-amd64.exe` or `cloudflared-windows-386.exe` if you have not renamed it.  
PowerShell  
```  
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe --version  
```

To download and install `cloudflared`:

Terminal window

```

brew install cloudflared


```

Alternatively, you can [download the latest Darwin amd64 release](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) directly.

**Debian and Ubuntu APT**

Use the apt package manager to install `cloudflared` on compatible machines.

1. Add Cloudflare's package signing key:

Terminal window

```

sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null


```

1. Add Cloudflare's apt repo to your apt repositories:

Terminal window

```

echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list


```

1. Update repositories and install cloudflared:

Terminal window

```

sudo apt-get update && sudo apt-get install cloudflared


```

**RHEL RPM**

Use the rpm package manager to install `cloudflared` on compatible machines.

1. Add Cloudflare's repository:  
Terminal window  
```  
curl -fsSl https://pkg.cloudflare.com/cloudflared.repo | sudo tee /etc/yum.repos.d/cloudflared.repo  
```
2. Update repositories and install cloudflared:  
Terminal window  
```  
sudo yum update && sudo yum install cloudflared  
```

**Arch Linux**

`cloudflared` is in the Arch Linux [community repository ↗](https://wiki.archlinux.org/title/official%5Frepositories#community). Use `pacman` to install `cloudflared` on compatible machines.

Terminal window

```

pacman -Syu cloudflared


```

**Other**

Alternatively you can download the `cloudflared` binary or the linux packages to your machine and install manually. Visit the [downloads](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) page to find the right package for your OS.

To build the latest version of `cloudflared` from source:

Terminal window

```

git clone https://github.com/cloudflare/cloudflared.git

cd cloudflared

make cloudflared

go install github.com/cloudflare/cloudflared/cmd/cloudflared


```

Depending on where you installed `cloudflared`, you can move it to a known path as well.

Terminal window

```

mv /root/cloudflared/cloudflared /usr/bin/cloudflared


```

## 2\. Authenticate `cloudflared`

Terminal window

```

cloudflared tunnel login


```

Running this command will:

* Open a browser window and prompt you to log in to your Cloudflare account. After logging in to your account, select your hostname.
* Generate an account certificate, the [cert.pem file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#certpem), in the [default cloudflared directory](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#default-cloudflared-directory).

## 3\. Create a tunnel and give it a name

Terminal window

```

cloudflared tunnel create <NAME>


```

Running this command will:

* Create a tunnel by establishing a persistent relationship between the name you provide and a UUID for your tunnel. At this point, no connection is active within the tunnel yet.
* Generate a [tunnel credentials file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#credentials-file) in the [default cloudflared directory](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#default-cloudflared-directory).
* Create a subdomain of `.cfargotunnel.com`.

From the output of the command, take note of the tunnel's UUID and the path to your tunnel's credentials file.

Confirm that the tunnel has been successfully created by running:

Terminal window

```

cloudflared tunnel list


```

## 4\. Create a configuration file

1. In your `.cloudflared` directory, create a [config.yml file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/) using any text editor. This file will configure the tunnel to route traffic from a given origin to the hostname of your choice.
2. Add the following fields to the file:  
If you are connecting a [published application](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/):  
```  
url: http://localhost:8000  
tunnel: <Tunnel-UUID>  
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json  
```  
If you are connecting a [private network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/):  
```  
tunnel: <Tunnel-UUID>  
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json  
warp-routing:  
  enabled: true  
```
3. Confirm that the configuration file has been successfully created by running:  
Terminal window  
```  
cat config.yml  
```

## 5\. Start routing traffic

1\. To route a [published application](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) through the tunnel:

Terminal window

```

cloudflared tunnel route dns <UUID or NAME> <hostname>


```

This command will create a `CNAME` record pointing to `<UUID>.cfargotunnel.com`.

2\. If you are connecting a private network, route a private IP address or CIDR through the tunnel:

Terminal window

```

cloudflared tunnel route ip add <IP/CIDR> <UUID or NAME>


```

3\. Confirm that the route has been successfully established:

Terminal window

```

cloudflared tunnel route ip show


```

## 6\. Run the tunnel

Run the tunnel to proxy incoming traffic from the tunnel to any number of services running locally on your origin.

Terminal window

```

cloudflared tunnel run <UUID or NAME>


```

If your configuration file has a custom name or is not in the `.cloudflared` directory, add the `--config` flag and specify the path.

Terminal window

```

cloudflared tunnel --config /path/your-config-file.yml run <UUID or NAME>


```

Note

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS. For more information, refer to [run as a service](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/).

## 7\. Check the tunnel

To get information on the tunnel you just created, run:

Terminal window

```

cloudflared tunnel info <UUID or NAME>


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/#page","headline":"Create a locally-managed tunnel · Cloudflare One docs","description":"Create a locally-managed tunnel in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CLI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/","name":"Other tunnel types"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/","name":"Locally-managed tunnels"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/","name":"Create a locally-managed tunnel"}}]}
```
