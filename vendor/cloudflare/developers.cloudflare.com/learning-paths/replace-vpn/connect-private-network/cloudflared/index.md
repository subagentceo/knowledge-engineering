---
title: Connect with Cloudflare Tunnel
description: Create a tunnel to your private network.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect with Cloudflare Tunnel

Cloudflare Tunnel is an outbound-only daemon service that can run on nearly any host machine and proxies local traffic once validated from the Cloudflare network. User traffic initiated from the Cloudflare One Client onramps to Cloudflare, passes down your Cloudflare Tunnel connections, and terminates automatically in your local network. Traffic reaching your internal applications or services will carry the local source IP address of the host machine running the `cloudflared` daemon.

## Create a tunnel

To connect your private network:

* [ Dashboard ](#tab-panel-9138)
* [ Terraform (v5) ](#tab-panel-9139)

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. Choose **Cloudflared** for the connector type and select **Next**.
4. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).
5. Select **Save tunnel**.
6. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.
7. Once the command has finished running, your connector will appear in Cloudflare One.  
![Connector appearing in the UI after cloudflared has run](https://developers.cloudflare.com/_astro/connector.BnVS4T_M_ZxLFu6.webp)
8. Select **Next**.
1. In the **CIDR** tab, enter the CIDR of your private network (for example, `10.0.0.0/8`).
2. Select **Save tunnel**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Cloudflare Tunnel Write`
2. Create a tunnel using the [cloudflare\_zero\_trust\_tunnel\_cloudflare ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Ftunnel%5Fcloudflared) resource.  
```  
resource "cloudflare_zero_trust_tunnel_cloudflared" "example_tunnel" {  
  account_id = var.cloudflare_account_id  
  name       = "Example tunnel"  
  config_src = "cloudflare"  
}  
```
3. Route the CIDR of your private network through the tunnel using the [cloudflare\_zero\_trust\_tunnel\_cloudflared\_route ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Ftunnel%5Fcloudflared%5Froute) resource:  
```  
resource "cloudflare_zero_trust_tunnel_cloudflared_route" "example_tunnel_route" {  
  account_id         = var.cloudflare_account_id  
  tunnel_id          = cloudflare_zero_trust_tunnel_cloudflared.example_tunnel.id  
  network            = "10.0.0.0/8"  
  comment            = "Example tunnel route"  
}  
```
4. Get the [token](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/) used to run the tunnel:  
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
5. Install `cloudflared` on a host machine in your private network and run the tunnel:  
   * [ Linux ](#tab-panel-9134)  
   * [ Windows ](#tab-panel-9135)  
   * [ macOS ](#tab-panel-9136)  
   * [ Docker ](#tab-panel-9137)  
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

All internal applications and services in this IP range are now connected to Cloudflare.

Note

If the tunnel is disconnected:

* Ensure that your on-premise or cloud firewall allows egress traffic on the [required ports](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/#required-for-tunnel-operation).
* Ensure that the `cloudflared` host machine can connect to your internal applications and services. Verify that the host has the proper security group memberships and that no firewalls will block traffic between the host and the target services.

## Best practices

* Segregate production and staging traffic among different Cloudflare tunnels.
* Add a [cloudflared replica](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) to another host machine for an additional point of availability.
* Distribute access to critical services (for example, private DNS, Active Directory, and other critical systems) across different tunnels for blast-radius reduction in the event of a server-side outage.
* [Enable notifications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/notifications/) in the Cloudflare dashboard to monitor tunnel health.
* [Monitor performance metrics](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/) to identify potential bottlenecks.
* [Update cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/) regularly.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflared/#page","headline":"Connect with Cloudflare Tunnel · Cloudflare Learning Paths","description":"Create a tunnel to your private network.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflared/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/","name":"Connect your private network"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/cloudflared/","name":"Connect with Cloudflare Tunnel"}}]}
```
