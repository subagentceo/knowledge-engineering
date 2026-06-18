---
title: Create a tunnel (API)
description: Create a tunnel (API) in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a tunnel (API)

Follow this guide to set up a Cloudflare Tunnel using the API.

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connectivity pre-checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

## Create an API token

[Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:

| Type    | Item              | Permission |
| ------- | ----------------- | ---------- |
| Account | Cloudflare Tunnel | Edit       |
| Zone    | DNS               | Edit       |

## 2\. Create a tunnel

Make a `POST` request to the [Cloudflare Tunnel](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/methods/create/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cloudflare One Connectors Write`
* `Cloudflare One Connector: cloudflared Write`
* `Cloudflare Tunnel Write`

Create a Cloudflare Tunnel

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "api-tunnel",

    "config_src": "cloudflare"

  }'


```

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

    "account_tag": "699d98642c564d2e855e9661899b7252",

    "created_at": "2025-02-18T22:41:43.534395Z",

    "deleted_at": null,

    "name": "example-tunnel",

    "connections": [],

    "conns_active_at": null,

    "conns_inactive_at": "2025-02-18T22:41:43.534395Z",

    "tun_type": "cfd_tunnel",

    "metadata": {},

    "status": "inactive",

    "remote_config": true,

    "credentials_file": {

      "AccountTag": "699d98642c564d2e855e9661899b7252",

      "TunnelID": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

      "TunnelName": "api-tunnel",

      "TunnelSecret": "bTSquyUGwLQjYJn8cI8S1h6M6wUc2ajIeT7JotlxI7TqNqdKFhuQwX3O8irSnb=="

    },

    "token": "eyJhIjoiNWFiNGU5Z..."

  }

}


```

Copy the `id` and `token` values shown in the output. You will need these values to configure and run the tunnel.

The next steps depend on whether you want to [publish an application to the Internet](#3a-publish-an-application) or [connect a private network](#3b-connect-a-network).

## 3a. Publish an application

Before you publish an application through your tunnel, you must:

* [Add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
* [Change your domain nameservers to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/).

Follow these steps to publish an application to the Internet. If you are looking to connect a private resource, skip to the [Connect a network](#3b-connect-a-network) section.

1. Make a [PUT request](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/subresources/configurations/methods/update/) to route your [local service URL](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/protocols/) to a public hostname. For example,  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Cloudflare One Connectors Write`  
   * `Cloudflare One Connector: cloudflared Write`  
   * `Cloudflare Tunnel Write`  
Put configuration  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/configurations" \  
  --request PUT \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "config": {  
        "ingress": [  
            {  
                "hostname": "app.example.com",  
                "service": "http://localhost:8001",  
                "originRequest": {}  
            },  
            {  
                "service": "http_status:404"  
            }  
        ]  
    }  
  }'  
```  
Note  
If you add a multi-level subdomain (more than one level of subdomain), you must [order an Advanced Certificate for the hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#i-see-this-site-cant-provide-a-secure-connection).  
Your ingress rules must include a catch-all rule at the end. In this example, `cloudflared` will respond with a 404 status code when the request does not match any of the previous hostnames.
2. [Create a DNS record](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) for your application:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `DNS Write`  
Create DNS Record  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "type": "CNAME",  
    "proxied": true,  
    "name": "app.example.com",  
    "content": "c1744f8b-faa1-48a4-9e5c-02ac921467fa.cfargotunnel.com"  
  }'  
```  
This DNS record allows Cloudflare to proxy `app.example.com` traffic to your Cloudflare Tunnel (`<tunnel-id>.cfargotunnel.com`).

This application will be publicly available on the Internet once you [run the tunnel](#4-install-and-run-the-tunnel). To allow or block specific users, [create an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

## 3b. Connect a network

To connect a private network through your tunnel, [add a tunnel route](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/create/):

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cloudflare One Networks Write`
* `Cloudflare Tunnel Write`

Create a tunnel route

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "network": "172.16.0.0/16",

    "tunnel_id": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

    "comment": "Example private network route"

  }'


```

`cloudflared` can now route traffic to these destination IPs. To configure Zero Trust policies and connect as a user, refer to [Connect private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/).

## 4\. Install and run the tunnel

Install `cloudflared` on your server and run the tunnel using the `token` value obtained in [2\. Create a tunnel](#2-create-a-tunnel). You can also get the tunnel token using the [Cloudflare Tunnel token](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/subresources/token/methods/get/) endpoint.

* [ Linux ](#tab-panel-7280)
* [ Windows ](#tab-panel-7281)
* [ macOS ](#tab-panel-7282)
* [ Docker ](#tab-panel-7283)

1. [Download and install ↗](https://pkg.cloudflare.com/index.html) `cloudflared`.
2. Run the following command:  
Terminal window  
```  
sudo cloudflared service install <TUNNEL_TOKEN>  
```

1. [Download and install](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/#windows) `cloudflared`.
2. Open Command Prompt as administrator.
3. Run the following command:  
```  
cloudflared.exe service install <TUNNEL_TOKEN>  
```

1. [Download and install](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/#macos) `cloudflared`.
2. Open a terminal window and run the following command:  
Terminal window  
```  
sudo cloudflared service install <TUNNEL_TOKEN>  
```

1. Open a terminal window.
2. Run the following command:  
Terminal window  
```  
docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token <TUNNEL_TOKEN>  
```

## 5\. Verify tunnel status

To check if the tunnel is serving traffic:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cloudflare One Connectors Write`
* `Cloudflare One Connectors Read`
* `Cloudflare One Connector: cloudflared Write`
* `Cloudflare One Connector: cloudflared Read`
* `Cloudflare Tunnel Write`
* `Cloudflare Tunnel Read`

Get a Cloudflare Tunnel

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/c1744f8b-faa1-48a4-9e5c-02ac921467fa" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

    "account_tag": "699d98642c564d2e855e9661899b7252",

    "created_at": "2025-02-18T22:41:43.534395Z",

    "deleted_at": null,

    "name": "example-tunnel",

    "connections": [

      {

        "colo_name": "bos01",

        "uuid": "2xz99mfm-a59e-4924-gyh9-z9vafaw6k0i2",

        "id": "2xz99mfm-a59e-4924-gyh9-z9vafaw6k0i2",

        "is_pending_reconnect": false,

        "origin_ip": "10.1.0.137",

        "opened_at": "2025-02-19T19:11:12.101642Z",

        "client_id": "4xh4eb3f-cz0j-2aso-hu6i-36207018771a",

        "client_version": "2025.2.0"

      },

      {

        "colo_name": "phl01",

        "uuid": "axe2socu-2fb5-3akx-b860-898zyes3cs9q",

        "id": "axe2socu-2fb5-3akx-b860-898zyes3cs9q",

        "is_pending_reconnect": false,

        "origin_ip": "10.1.0.137",

        "opened_at": "2025-02-19T19:11:12.006297Z",

        "client_id": "4xh4eb3f-cz0j-2aso-hu6i-36207018771a",

        "client_version": "2025.2.0"

      },

      {

        "colo_name": "phl01",

        "uuid": "9b5y0wm9-ca7f-ibq6-8ff4-sm53xekfyym1",

        "id": "9b5y0wm9-ca7f-ibq6-8ff4-sm53xekfyym1",

        "is_pending_reconnect": false,

        "origin_ip": "10.1.0.137",

        "opened_at": "2025-02-19T19:11:12.004721Z",

        "client_id": "4xh4eb3f-cz0j-2aso-hu6i-36207018771a",

        "client_version": "2025.2.0"

      },

      {

        "colo_name": "bos01",

        "uuid": "g6cdeiz1-80f5-3akx-b18b-3y0ggktoxwkd",

        "id": "g6cdeiz1-80f5-3akx-b18b-3y0ggktoxwkd",

        "is_pending_reconnect": false,

        "origin_ip": "10.1.0.137",

        "opened_at": "2025-02-19T19:11:12.110765Z",

        "client_id": "4xh4eb3f-cz0j-2aso-hu6i-36207018771a",

        "client_version": "2025.2.0"

      }

    ],

    "conns_active_at": "2025-02-19T19:11:12.004721Z",

    "conns_inactive_at": null,

    "tun_type": "cfd_tunnel",

    "metadata": {},

    "status": "healthy",

    "remote_config": true

  }

}


```

A healthy tunnel will have four connections to Cloudflare's network.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/#page","headline":"Create a tunnel (API) · Cloudflare One docs","description":"Create a tunnel (API) in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/","name":"Get started"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/","name":"Create a tunnel (API)"}}]}
```
