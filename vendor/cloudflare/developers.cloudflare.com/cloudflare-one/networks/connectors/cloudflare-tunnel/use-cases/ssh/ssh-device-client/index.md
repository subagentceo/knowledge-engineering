---
title: Connect with self-managed SSH keys
description: Connect with self-managed SSH keys in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect with self-managed SSH keys

If you want to manage your own SSH keys, you can use Cloudflare Tunnel to create a secure, outbound-only connection from your server to Cloudflare's global network. This requires running the `cloudflared` daemon on the server (or any other host machine within the private network). Users with SSH keys that are trusted by the SSH server can access the server by installing the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) on their device and enrolling in your Zero Trust organization. Users can SSH directly to the server's private hostname (for example, `ssh.internal.local`). You control access to the server using network-level Gateway policies instead of application-level Access policies.

Note

If you want to create more granular policies, allow Cloudflare to manage SSH keys for you, or to obtain command logs, consider using [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) instead.

## Prerequisites

* A [Cloudflare Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization)
* [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) installed on user devices.
* Devices [enrolled](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) in your Zero Trust organization

## 1\. Create an example SSH server

This example walks through how to set up an SSH server on a Google Cloud Platform (GCP) virtual machine (VM), but you can use any machine that supports SSH connections. If you already have an SSH server configured, you can skip to [Step 2](#2-connect-the-server-to-cloudflare).

### 1.1 Create an SSH key pair

Before creating your VM instance you will need to create an SSH key pair.

1. Open a terminal and type the following command:  
Terminal window  
```  
ssh-keygen -t rsa -f ~/.ssh/gcp_ssh -C <username in GCP>  
```
2. Enter your passphrase when prompted. It will need to be entered twice.  
Two files will be generated: `gcp_ssh` which contains the private key, and `gcp_ssh.pub` which contains the public key.
3. In the command line, enter:  
Terminal window  
```  
cat ~/.ssh/gcp_ssh.pub  
```
4. Copy the output. This will be used when creating the VM instance in GCP.

### 1.2 Create a VM instance in GCP

Now that the SSH key pair has been created, you can create a VM instance.

1. In your [Google Cloud Console ↗](https://console.cloud.google.com/), [create a new project ↗](https://developers.google.com/workspace/guides/create-project).
2. Go to **Compute Engine** \> **VM instances**.
3. Select **Create instance**.
4. Name your VM instance, for example `ssh-server`.
5. Scroll down to **Advanced options** \> **Security** \> **Manage Access**.
6. Under **Add manually generated SSH keys**, select **Add item** and paste the public key that you have created.
7. Select **Create**.
8. Once your VM instance is running, open the dropdown next to **SSH** and select _Open in browser window_.

Note

In order to be able to establish an SSH connection, do not enable [OS Login ↗](https://cloud.google.com/compute/docs/oslogin) on the VM instance.

## 2\. Connect the server to Cloudflare

This section covers how to create a new Cloudflare Tunnel for your SSH server. You can reuse the same tunnel for all services on a private network that are reachable from the `cloudflared` host.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. Choose **Cloudflared** for the connector type and select **Next**.
4. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).
5. Select **Save tunnel**.
6. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.
7. Once the command has finished running, your connector will appear in Cloudflare One.  
![Connector appearing in the UI after cloudflared has run](https://developers.cloudflare.com/_astro/connector.BnVS4T_M_ZxLFu6.webp)
8. Select **Next**.

## 3\. Use hostname routes

Hostname routes allow you to SSH directly to `ssh.internal.local` without managing static IP routes. Hostname routes are especially useful when your SSH server has an unknown or ephemeral IP address, such as dynamic infrastructure provisioned by cloud providers.

How hostname routing works

When you create a hostname route in Cloudflare Tunnel:

1. Users SSH to your private hostname (for example, `ssh user@ssh.internal.local`).
2. Gateway resolves the hostname to an initial resolved IP from a CGNAT range.
3. Traffic routes through the WARP tunnel to Cloudflare.
4. Gateway network policies evaluate the connection.
5. Cloudflared proxies the connection to your SSH server's private IP.

If you do not have a private DNS resolver configured or would rather SSH to an IP address, skip to [Step 4](#4-optional-use-ip-routes).

### 3.1 Add a hostname route

To add a hostname route to your tunnel:

1. In your tunnel configuration, go to the **Hostname routes** tab.
2. Enter the hostname of your SSH server (for example, `ssh.internal.local`).  
Hostname format restrictions  
   * **Character limit:** Must be less than 255 characters.  
   * **Supported wildcards:** A single wildcard (`*`) is allowed, and it must represent a full DNS label. Example: `*.internal.local`  
   * **Unsupported wildcards:** The following wildcard formats are not supported:  
         * Partial wildcards such as `*-dev.internal.local` or `dev-*.internal.local`.  
         * Wildcards in the middle, such as `foo*bar.internal.local` or `foo.*.internal.local`.  
         * Multiple wildcards in the hostname, such as `*.*.internal.local`.  
   * **Wildcard trimming**: Leading wildcards (`*`) are trimmed off and an implicit dot (`.`) is assumed. For example, `*.internal.local` is saved as `internal.local` but will match all subdomains at the wildcard level (covers `foo.internal.local` but not `foo.bar.internal.local`).  
   * **Dot trimming:** Leading and ending dots (`.`) are allowed but trimmed off.
3. Select **Complete setup**.

### 3.2 Configure DNS resolution

When Gateway receives a request for your private hostname, it must resolve the hostname to your SSH server's private IP address.

#### Scenario A: Use the system resolver (Default)

By default, `cloudflared` uses the private DNS resolver configured on its host machine (for example, in `/etc/resolv.conf` on Linux). If the machine running `cloudflared` can already resolve `ssh.internal.local` to its private IP using the local system resolver, no further configuration is required. You can skip to [Step 3.3](#33-configure-cloudflare-one-clients).

Verify local DNS resolution

To check if `cloudflared` can successfully resolve `ssh.internal.local`, run the following command from the `cloudflared` host:

Terminal window

```

nslookup ssh.internal.local


```

```

Server:    127.0.2.2

Address:  127.0.2.2#53


Non-authoritative answer:

Name:  ssh.internal.local

Address: 10.2.0.3


```

The output should contain the server's private IP address (the **Internal IP** of the GCP VM). If the hostname fails to resolve:

* Make sure that your private DNS resolver has a record that points `ssh.internal.local` to the server's private IP.
* In GCP, you may need to [add a private zone to Cloud DNS ↗](https://docs.cloud.google.com/dns/docs/zones#create-private-zone) so that `internal.local` resolves using your private DNS resolver.

#### Scenario B: Use a specific private DNS server (Advanced)

If you need `cloudflared` to use a specific internal DNS server that is different from the host's default resolver, you must explicitly connect that DNS server to Cloudflare via an [IP/CIDR route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/). You will also need to configure a [Gateway resolver policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to route queries to this specific private DNS server.

1. To create an IP/CIDR route for the DNS server:  
   1. Go to **Networks** \> **Routes** \> **CIDR**.  
   2. Select **Add CIDR route**.  
   3. Enter the private IP address of your internal DNS resolver.  
   4. Select the Cloudflare Tunnel that connects to the network where this DNS server resides.  
   5. Select **Create**.
2. To create a resolver policy:  
   1. Go to **Traffic policies** \> **Resolver policies**.  
   2. Select **Create a policy**.  
   3. Create an expression that matches the private hostname:  
   | Selector | Operator | Value              |  
   | -------- | -------- | ------------------ |  
   | Host     | in       | ssh.internal.local |  
   4. Under **Configure custom DNS resolvers**, enter the private IP address of your internal DNS server.  
   5. From the dropdown menu, select the `- Private` routing option and the [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) assigned to the tunnel you selected in the previous step.  
   6. Select **Create policy**.

### 3.3 Configure Cloudflare One Clients

To connect to private hostnames, Cloudflare One Clients must be configured to forward the following traffic to Cloudflare:

* Initial resolved IPs (CGNAT range: `100.64.0.0/10`)
* DNS queries for your private hostname

#### 3.3.1 Configure Split Tunnels

In your WARP [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/), configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) such that the initial resolved IPs route through the WARP tunnel. Configuration depends on your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode):

* **Exclude mode**: Delete `100.64.0.0/10` from your Split Tunnels list. We recommend [adding back the IP ranges](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#split-tunnel-configuration) that are not explicitly used for Cloudflare One services. This reduces the risk of conflicts with existing private network configurations that may use the CGNAT address space.
* **Include mode**: Add Split Tunnel entries for the following IP addresses:  
   * **IPv4**: `100.80.0.0/16`  
   * **IPv6**: `2606:4700:0cf1:4000::/64`

#### 3.3.2 Configure Local Domain Fallback

In [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/), delete the top-level domain for your private hostname. This configures WARP to send the DNS query to Cloudflare Gateway for resolution.

For example, if your SSH hostname is `ssh.internal.local`, remove `internal.local` from Local Domain Fallback.

## 4\. (Optional) Use IP routes

### 4.1 Add an IP route

To connect to the SSH server using its IP address (instead of a [hostname](#3-use-hostname-routes)), [add a CIDR route](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/#add-a-cidr-route) that includes the server's private IP address.

### 4.2 Configure Cloudflare One Clients

By default, WARP excludes traffic bound for [RFC 1918 space ↗](https://datatracker.ietf.org/doc/html/rfc1918), which are IP addresses typically used in private networks and not reachable from the Internet. In order for the Cloudflare One Client to send traffic to your private network, you must configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that the IP/CIDR of your private network routes through the Cloudflare One Client.

1. First, check whether your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include** mode.
2. Edit your Split Tunnel routes depending on the mode:  
   * [ Exclude IPs and domains ](#tab-panel-7318)  
   * [ Include IPs and domains ](#tab-panel-7319)  
If you are using **Exclude** mode:  
a. [Delete the route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#remove-a-route) containing your private network's IP/CIDR range. For example, if your network uses the default AWS range of `172.31.0.0/16`, delete `172.16.0.0/12`.  
b. [Re-add IP/CIDR ranges](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) that are not explicitly used by your private network. For the AWS example above, you would add new entries for `172.16.0.0/13`, `172.24.0.0/14`, `172.28.0.0/15`, and `172.30.0.0/16`. This ensures that only traffic to `172.31.0.0/16` routes through the Cloudflare One Client.  
You can use the following calculator to determine which IP addresses to re-add:  
**Base CIDR:** **Subtracted CIDRs:**  
Calculate  
Calculator instructions  
   1. In **Base CIDR**, enter the RFC 1918 range that you deleted from Split Tunnels.  
   2. In **Subtracted CIDRs**, enter the IP/CIDR range used by your private network.  
   3. Re-add the calculator results to your Split Tunnel Exclude mode list.  
By tightening the private IP range included in the Cloudflare One Client, you reduce the risk of breaking a user's [access to local resources](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion).  
If you are using **Include** mode:  
   1. Add the required [Zero Trust domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-domains) or [IP addresses](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-ip-addresses) to your Split Tunnel include list.  
   2. [Add a route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) to include your private network's IP/CIDR range.

## 5\. (Optional) Create Gateway network policies

By default, all devices enrolled in your organization can SSH to the server unless you build Gateway network policies to allow or block specific users. You can create policies based on user identity, device posture, location, and other criteria.

* [ Dashboard ](#tab-panel-7316)
* [ Terraform (v5) ](#tab-panel-7317)

1. Go to **Traffic policies** \> **Traffic settings**.
2. In **Proxy and inspection**, turn on **Allow Secure Web Gateway to proxy traffic**.
3. Select **TCP**.
4. Select **UDP** (required to proxy traffic to internal DNS resolvers).
5. (Recommended) To proxy traffic for diagnostic tools such as `ping` and `traceroute`, select **ICMP**. You may also need to [update your system](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#icmp) to allow ICMP traffic through `cloudflared`.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Turn on the TCP and/or UDP proxy using the [cloudflare\_zero\_trust\_device\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fsettings) resource:  
```  
resource "cloudflare_zero_trust_device_settings "global_warp_settings" {  
  account_id            = var.cloudflare_account_id  
  gateway_proxy_enabled = true  
  gateway_udp_proxy_enabled = true  
}  
```

Cloudflare will now proxy traffic from enrolled devices, except for the traffic excluded in your [split tunnel settings](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#3-route-private-network-ips-through-the-cloudflare-one-client). For more information on how Gateway forwards traffic, refer to [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/).

### Example policies

The following example consists of two policies: the first allows specific users to reach your SSH server, and the second blocks all other traffic.

#### Policy 1: Allow authorized users

1. Go to **Traffic policies** \> **Firewall policies** \> **Network**.
2. Select **Create a policy**.
3. Name your policy (for example, `Allow SSH to internal server`).
4. Create an expression to match your SSH hostname and authorized users:  
| Selector   | Operator | Value                                 |  
| ---------- | -------- | ------------------------------------- |  
| SNI        | in       | ssh.internal.local                    |  
| User Email | in       | admin@example.com, devops@example.com |
5. In **Action**, select **Allow**.
6. Select **Create policy**.

#### Policy 2: Catch-all block

To prevent Cloudflare One Client users from accessing your entire private network, we recommend creating a [catch-all Gateway block policy](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/create-policy/#catch-all-policy) for your private IP space. You can then layer on higher priority Allow policies (in either Access or Gateway) which grant users access to specific applications or IPs.

### Additional security with DNS policies

For an additional layer of protection, create a Gateway DNS policy to control DNS resolution:

1. Go to **Traffic policies** \> **Firewall Policies** \> **DNS**.
2. Select **Create a policy**.
3. Name your policy (for example, `Allow SSH hostname resolution`).
4. Create an expression:  
| Selector   | Operator | Value                                 |  
| ---------- | -------- | ------------------------------------- |  
| Host       | in       | ssh.internal.local                    |  
| User Email | in       | admin@example.com, devops@example.com |
5. In **Action**, select **Allow**.
6. Select **Create policy**.

SNI selector limitations

By default, SNI selectors only apply to HTTPS traffic on port `443`. To inspect traffic on every port, turn on [protocol detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) and choose to [inspect on all ports](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports).

Additionally, SNI selectors will only apply to Cloudflare One Client traffic.

## 6\. Connect as a user

Once you have set up the tunnel route and the user device, the user can now SSH into the machine. If your SSH server requires an SSH key, the key should be included in the SSH command.

Terminal window

```

ssh -i ~/.ssh/gcp_ssh <username>@ssh.internal.local


```

The Cloudflare One Client must be connected to your Zero Trust organization. Users will be able to connect if they match the Gateway network policies you created.

### Troubleshooting

If you cannot connect, verify the following:

1. **Confirm DNS resolution** \- From the device, confirm that you can successfully resolve the private hostname:  
Terminal window  
```  
nslookup ssh.internal.local  
```  
```  
Server:    127.0.2.2  
Address:  127.0.2.2#53  
Non-authoritative answer:  
Name:  ssh.internal.local  
Address: 100.80.200.48  
```  
The query should resolve using [WARP's DNS proxy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#dns-traffic) and return a Gateway initial resolved IP. If the query fails to resolve or returns a different IP, check your [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) configuration and [Gateway resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/).
2. **Check Gateway logs** \- Review your [Gateway network logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) to see if the connection is being blocked by a policy.
3. **Verify tunnel status** \- Confirm that your tunnel is healthy and connected by checking [tunnel status](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/).
4. **Test connectivity to initial resolved IP** \- When you connect to the SSH server using its private hostname, the device should make a connection to the initial resolved IP:  
Terminal window  
```  
ssh -v <username>@ssh.internal.local  
```  
```  
...  
Authenticated to ssh.internal.local ([100.80.200.48]:22) using "publickey".  
...  
```  
Look for a line showing connection to an IP in the `100.64.0.0/10` range. If the request fails, confirm that the initial resolved IP [routes through the WARP tunnel](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/). You can also check your [tunnel logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) to confirm that requests are routing to the server's private IP.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-device-client/#page","headline":"Connect with self-managed SSH keys · Cloudflare One docs","description":"Connect with self-managed SSH keys in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-device-client/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/","name":"SSH"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-device-client/","name":"Connect with self-managed SSH keys"}}]}
```
