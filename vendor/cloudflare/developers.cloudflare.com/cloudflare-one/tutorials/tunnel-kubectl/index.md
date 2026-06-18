---
title: Use Cloudflare Tunnels with Kubernetes client-go credential plugins
description: This tutorial explains how to use Cloudflare Tunnels with Kubernetes client-go credential plugins for authentication. By following these steps, you can securely access your Kubernetes cluster through a Cloudflare Tunnel.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use Cloudflare Tunnels with Kubernetes client-go credential plugins

**Last reviewed:**  over 1 year ago 

This tutorial explains how to use Cloudflare Tunnels with Kubernetes client-go credential plugins for authentication. By following these steps, you can securely access your Kubernetes cluster through a Cloudflare Tunnel using the `kubectl` command-line tool.

## Prerequisites

* A Cloudflare account
* The Cloudflare Tunnel client (`cloudflared`) installed on your machine
* Access to a Kubernetes cluster
* `kubectl` installed on your machine

## 1\. Set up a Cloudflare Tunnel

1. Authenticate `cloudflared` with your Cloudflare account:  
Terminal window  
```  
cloudflared tunnel login  
```
2. Create a new tunnel:  
Terminal window  
```  
cloudflared tunnel create k8s-tunnel  
```
3. Configure your tunnel by creating a configuration file named `config.yml`:  
YAML  
```  
tunnel: <TUNNEL_ID>  
credentials-file: /path/to/credentials.json  
ingress:  
  - hostname: k8s.example.com  
    service: tcp://kubernetes.default.svc.cluster.local:443  
  - service: http_status:404  
```  
Replace `<TUNNEL_ID>` with your tunnel ID and adjust the hostname as needed.
4. Start the tunnel:  
Terminal window  
```  
cloudflared tunnel run k8s-tunnel  
```

## 2\. Configure the Kubernetes API server

Ensure your Kubernetes API server is configured to accept authentication from Cloudflare Tunnels. This may involve setting up an authentication webhook or configuring the API server to trust the Cloudflare Tunnel's client certificates.

## 3\. Set up client-go credential plugin

1. Create a script named `cloudflare-k8s-auth.sh` with the following content:  
```  
#!/bin/bash  
echo '{  
  "apiVersion": "client.authentication.k8s.io/v1beta1",  
  "kind": "ExecCredential",  
  "status": {  
    "token": "'"$(cloudflared access token -app=https://k8s.example.com)"'"  
  }  
}'  
```  
Make the script executable:  
Terminal window  
```  
chmod +x cloudflare-k8s-auth.sh  
```
2. Update your `~/.kube/config` file to use the credential plugin:  
YAML  
```  
apiVersion: v1  
kind: Config  
clusters:  
  - cluster:  
      server: https://k8s.example.com  
    name: cloudflare-k8s  
users:  
  - name: cloudflare-user  
    user:  
      exec:  
        apiVersion: client.authentication.k8s.io/v1beta1  
        command: /path/to/cloudflare-k8s-auth.sh  
        interactiveMode: Never  
contexts:  
  - context:  
      cluster: cloudflare-k8s  
      user: cloudflare-user  
    name: cloudflare-k8s-context  
current-context: cloudflare-k8s-context  
```

## 4\. Use kubectl with Cloudflare Tunnel

Now you can use `kubectl` commands as usual. The client-go credential plugin will automatically handle authentication through the Cloudflare Tunnel:

Terminal window

```

kubectl get pods


```

## Troubleshooting

If you encounter issues:

* Ensure `cloudflared` is running and the tunnel is active
* Check that your `~/.kube/config` file is correctly configured
* Verify that the Kubernetes API server is properly set up to accept authentication from Cloudflare Tunnels
* Review the Cloudflare Tunnel logs for any error messages

For more information, refer to the [Cloudflare Tunnels documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) and the [Kubernetes client-go credential plugins documentation ↗](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/tunnel-kubectl/#page","headline":"Use Cloudflare Tunnels with Kubernetes client-go credential plugins · Cloudflare One docs","description":"This tutorial explains how to use Cloudflare Tunnels with Kubernetes client-go credential plugins for authentication. By following these steps, you can securely access your Kubernetes cluster through a Cloudflare Tunnel.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/tunnel-kubectl/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Kubernetes"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/tunnel-kubectl/","name":"Use Cloudflare Tunnels with Kubernetes client-go credential plugins"}}]}
```
