---
title: Connect through Cloudflare Access using kubectl
description: Connecting to Cloudflare's network using kubectl. Create a Zero Trust policy for your machine. Create an outbound-only connection between your machine and Cloudflared's network.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect through Cloudflare Access using kubectl

**Last reviewed:**  almost 4 years ago 

You can connect to machines over `kubectl` using Cloudflare's Zero Trust platform.

**This walkthrough covers how to:**

* Build a policy in Cloudflare Access to secure the machine
* Connect a machine to Cloudflare's network using kubectl
* Connect from a client machine

**Before you start**

* [Add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)

**Time to complete:**

30 minutes

---

## Create an Access policy

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **Self-hosted and private**.
4. Select **Add public hostname** and input a subdomain. This will be the hostname where your application will be available to users.
5. [Create a new policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) to control who can reach the application, or select existing policies.
6. Follow the remaining [self-hosted application creation steps](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) to publish the application.

## Install `cloudflared`

Cloudflare Tunnel creates a secure, outbound-only connection between this machine and Cloudflare's network. With an outbound-only model, you can prevent any direct access to this machine and lock down any externally exposed points of ingress. And with that, no open firewall ports.

Cloudflare Tunnel is made possible through a lightweight daemon from Cloudflare called `cloudflared`. Download and install `cloudflared` on the DigitalOcean machine by following the instructions listed on the [Downloads](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) page.

## Authenticate `cloudflared`

Run the following command to authenticate cloudflared into your Cloudflare account.

Terminal window

```

cloudflared tunnel login


```

`cloudflared` will open a browser window and prompt you to log in to your Cloudflare account. If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

Choose any hostname presented in the list. Cloudflare will issue a certificate scoped to your account. You do not need to pick the specific hostname where you will serve the Tunnel.

## Create a Tunnel

Next, create a tunnel with the command below.

Terminal window

```

cloudflared tunnel create <NAME>


```

Replacing `<NAME>` with a name for the Tunnel. This name can be any value. A single Tunnel can also serve traffic for multiple hostnames to multiple services in your environment, including a mix of connection types like SSH and HTTP.

The command will output an ID for the Tunnel and generate an associated credentials file. At any time you can list the Tunnels in your account with the following command.

Terminal window

```

cloudflared tunnel list


```

## Configure the Tunnel

You can now [configure the tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/#4-create-a-configuration-file) to serve traffic.

Create a `YAML` file that `cloudflared` can reach. By default, `cloudflared` will look for the file in the same folder where `cloudflared` has been installed.

Terminal window

```

vim ~/.cloudflared/config.yml


```

Next, configure the Tunnel, replacing the example ID below with the ID of the Tunnel created above. Additionally, replace the hostname in this example with the hostname of the application configured with Cloudflare Access.

YAML

```

tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef

credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json


ingress:

  - hostname: azure.widgetcorp.tech

    service: tcp://kubernetes.docker.internal:6443

    originRequest:

      proxyType: socks

  - service: http_status:404

  # Catch-all rule, which responds with 404 if traffic doesn't match any of

  # the earlier rules


```

## Route to the Tunnel

You can now create a DNS record that will route traffic to this Tunnel. Multiple DNS records can point to a single Tunnel and will send traffic to the configured service as long as the hostname is defined with an [ingress rule](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/#file-structure-for-public-hostnames).

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to the **DNS Records** page for your domain.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**. Choose `CNAME` as the record type. For **Name**, choose the hostname where you want to create a Tunnel. This should match the hostname of the Access policy.
3. For **Target**, input the ID of your Tunnel followed by `.cfargotunnel.com`. For example:

```

  6ff42ae2-765d-4adf-8112-31c55c1551ef.cfargotunnel.com


```

1. Select **Save**.

## Run the Tunnel

You can now run the Tunnel to connect the target service to Cloudflare. Use the following command to run the Tunnel, replacing `<NAME>` with the name created for your Tunnel.

Terminal window

```

cloudflared tunnel run <NAME>


```

We recommend that you run `cloudflared` [as a service](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/) that is configured to launch on start.

## Connect from a client machine

You can now connect from a client machine using `cloudflared`.

This example uses a macOS laptop. On macOS, you can install `cloudflared` with the following command using Homebrew.

Terminal window

```

brew install cloudflared


```

Run the following command to create a connection from the device to Cloudflare. Any available port can be specified.

Terminal window

```

cloudflared access tcp --hostname azure.widgetcorp.tech --url 127.0.0.1:1234


```

With this service running, you can run a `kubectl` command and `cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider. Once authenticated, `cloudflared` will expose the connection to the client machine at the local URL specified in the command.

`kubeconfig` does not support proxy command configurations at this time, though the community has submitted plans to do so. In the interim, users can alias the cluster's API server to save time.

Terminal window

```

alias kubeone="env HTTPS_PROXY=socks5://127.0.0.1:1234 kubectl"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/kubectl/#page","headline":"Connect through Cloudflare Access using kubectl · Cloudflare One docs","description":"Connecting to Cloudflare's network using kubectl. Create a Zero Trust policy for your machine. Create an outbound-only connection between your machine and Cloudflared's network.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/kubectl/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Kubernetes","TCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/kubectl/","name":"Connect through Cloudflare Access using kubectl"}}]}
```
