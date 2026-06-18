---
title: Tunnel permissions
description: Manage tunnel tokens and control who can run your remotely-managed tunnels.

image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnel permissions

A remotely-managed tunnel only requires the tunnel token to run. Anyone with access to the token will be able to run the tunnel.

## Get the tunnel token

To get the token for a remotely-managed tunnel:

* [ Dashboard ](#tab-panel-7254)
* [ API ](#tab-panel-7255)
* [ Terraform (v5) ](#tab-panel-7256)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select a `cloudflared` tunnel and select **Edit**.
3. Copy the `cloudflared` installation command into a text editor (do not run the command). The token is the `eyJ...` string.

Make a `GET` request to the [Cloudflare Tunnel token](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/subresources/token/methods/get/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cloudflare One Connectors Write`
* `Cloudflare One Connector: cloudflared Write`
* `Cloudflare Tunnel Write`

Get a Cloudflare Tunnel token

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/token" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": "eyJhIjoiNWFiNGU5Z..."

}


```

The token value can be found in the `result`.

```

data "cloudflare_zero_trust_tunnel_cloudflared_token" "tunnel_token" {

  account_id = var.cloudflare_account_id

  tunnel_id = cloudflare_zero_trust_tunnel_cloudflared.example_tunnel.id

}


```

If your host machine is not managed in Terraform or you want to install the tunnel manually, you can output the token value to the CLI.

Example: Output to CLI

1. Output the tunnel token to the Terraform state file:  
```  
output "tunnel_token" {  
  value       = data.cloudflare_zero_trust_tunnel_cloudflared_token.tunnel_token.token  
  sensitive   = true  
}  
```
2. Apply the configuration:  
Terminal window  
```  
terraform apply  
```
3. Read the tunnel token:  
Terminal window  
```  
terraform output -raw tunnel_token  
```  
```  
eyJhIj...  
```

Alternatively, pass `data.cloudflare_zero_trust_tunnel_cloudflared_token.tunnel_token.token` directly into your host's Terraform configuration or store the token in your secret management tool.

Example: Store in HashiCorp Vault

```

resource "vault_generic_secret" "tunnel_token" {

  path         = "kv/cloudflare/tunnel_token"


  data_json = jsonencode({

    "TUNNEL_TOKEN" = data.cloudflare_zero_trust_tunnel_cloudflared_token.tunnel_token.token

  })

}


```

## Rotate a token without service disruption

Cloudflare recommends rotating the tunnel token at a regular cadence to reduce the risk of token compromise. You can rotate a token with minimal disruption to users as long as the tunnel is served by at least two [cloudflared replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/). To ensure service availability, we recommend performing token rotations outside of working hours or in a maintenance window.

To rotate a tunnel token:

1. Refresh the token on Cloudflare:  
   * [ Dashboard ](#tab-panel-7257)  
   * [ API ](#tab-panel-7258)  
   1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.  
   2. Select a `cloudflared` tunnel and select **Edit**.  
   3. Select **Refresh token**.  
   4. Copy the `cloudflared` installation command for your operating system. This command contains the new token.  
   1. Generate a random base64 string (minimum size 32 bytes) to use as a tunnel secret:  
   Terminal window  
   ```  
   openssl rand -base64 32  
   ```  
   ```  
   AQIDBAUGBwgBAgMEBQYHCAECAwQFBgcIAQIDBAUGBwg=  
   ```  
   2. Make a `PATCH` request to the [Cloudflare Tunnel](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/methods/edit/) endpoint:  
   Required API token permissions  
   At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
         * `Cloudflare One Connectors Write`  
         * `Cloudflare One Connector: cloudflared Write`  
         * `Cloudflare Tunnel Write`  
   Update a Cloudflare Tunnel  
   ```  
   curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID" \  
     --request PATCH \  
     --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
     --json '{  
       "name": "Example tunnel",  
       "tunnel_secret": "AQIDBAUGBwgBAgMEBQYHCAECAwQFBgcIAQIDBAUGBwg="  
     }'  
   ```  
   ```  
   {  
     "success": true,  
     "errors": [],  
     "messages": [],  
     "result": {  
       "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",  
       "account_tag": "699d98642c564d2e855e9661899b7252",  
       "created_at": "2024-12-04T22:03:26.291225Z",  
       "deleted_at": null,  
       "name": "Example tunnel",  
       "connections": [],  
       "conns_active_at": null,  
       "conns_inactive_at": "2024-12-04T22:03:26.291225Z",  
       "tun_type": "cfd_tunnel",  
       "metadata": {},  
       "status": "inactive",  
       "remote_config": true,  
       "token": "eyJhIjoiNWFiNGU5Z..."  
     }  
   }  
   ```  
   3. Copy the `token` value shown in the output.  
After refreshing the token, `cloudflared` can no longer establish new connections to Cloudflare using the old token. However, existing connectors will remain active and the tunnel will continue serving traffic.
2. On half of your `cloudflared` replicas, reinstall the `cloudflared` service with the new token. For example, on a Linux host:  
Terminal window  
```  
  sudo cloudflared service uninstall  
sudo cloudflared service install <NEW_TOKEN>  
```
3. Confirm that the service started correctly:  
Terminal window  
```  
sudo systemctl status cloudflared  
```  
While these replicas are connecting to Cloudflare with the new token, traffic will automatically route through the other replicas.
4. Wait 10 minutes for traffic to route through the new connectors.
5. Repeat steps 2, 3, and 4 for the second half of the replicas.

The tunnel token is now fully rotated. The old token is no longer in use.

## Rotate a compromised token

If your tunnel token is compromised, we recommend taking the following steps:

1. Refresh the token using the dashboard or API. Refer to Step 1 of [Rotate a token without service disruption](#rotate-a-token-without-service-disruption).
2. [Delete all connections](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/connections/methods/delete/) between `cloudflared` and Cloudflare:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Cloudflare One Connectors Write`  
   * `Cloudflare One Connector: cloudflared Write`  
   * `Cloudflare Tunnel Write`  
Clean up Cloudflare Tunnel connections  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/connections" \  
  --request DELETE \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
This will clean up any unauthorized connections and prevent users from connecting to your network.
3. On each `cloudflared` replica, update `cloudflared` to use the new token. For example, on a Linux host:  
Terminal window  
```  
  sudo cloudflared service uninstall  
sudo cloudflared service install <NEW_TOKEN>  
```
4. Confirm that the service started correctly:  
Terminal window  
```  
sudo systemctl status cloudflared  
```

The tunnel token is now fully rotated. The old token is no longer in use.

## Account-scoped roles

Minimum permissions needed to create, delete, and configure tunnels for an account:

* [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/roles-permissions/)

Additional permissions needed to [route traffic to a public hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) and to be able to perform `cloudflared login`:

* [DNS](https://developers.cloudflare.com/fundamentals/manage-members/roles/)
* [Load Balancer](https://developers.cloudflare.com/fundamentals/manage-members/roles/)

## Resource-scoped permissions

You can also scope permissions to individual [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances instead of granting account-wide access. Refer to [Granular permissions for Tunnels and Mesh nodes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/granular-permissions/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/#page","headline":"Tunnel permissions · Cloudflare One docs","description":"Manage tunnel tokens and control who can run your remotely-managed tunnels.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CLI","Terraform"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/","name":"Configure a tunnel"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/","name":"Tunnel permissions"}}]}
```
