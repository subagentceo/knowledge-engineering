---
title: Connect to RDP in a browser
description: Connect to RDP in a browser in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to RDP in a browser

Users can connect to an RDP server without installing an RDP client or the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) on their device. Browser-based RDP leverages [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), which creates a secure, outbound-only connection from your RDP server to Cloudflare's global network. Setup involves running the `cloudflared` daemon on the RDP server (or any other host machine within the private network) and routing RDP traffic over a public hostname.

There are two ways for users to [reach the RDP server in their browser](#4-connect-as-a-user):

* **App Launcher (recommended)**: Users can log in to the [Access App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) with their Cloudflare Access credentials and then initiate an RDP connection within the browser to their Windows machine. Users will authenticate to the Windows machine using their pre-configured Windows username and password. Cloudflare does not manage any credentials on the Windows server.
* **Direct URL**: A user may also navigate directly to the Windows server at `https://<app-domain>/rdp/<vnet-id>/<target-ip>/<port>`, where `vnet-id` is the virtual network assigned to the Cloudflare Tunnel route. The authentication flow is the same as for the App Launcher; first users must log in to Cloudflare Access and then use their Windows credentials to authenticate to the Windows machine.

Browser-based RDP can be used in conjunction with [the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-device-client/) so that there are multiple ways to connect to the server. You can reuse the same Cloudflare Tunnel when configuring each connection method.

## Prerequisites

* An [active domain on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
* The domain uses either a [full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or a [partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).
* An RDP server running a supported [Windows operating system](#rdp-server-operating-systems).

## 1\. Connect the server to Cloudflare

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. [Create a new tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or edit an existing `cloudflared` tunnel.
1. In the **CIDR** tab for the tunnel, enter the IP or CIDR address of your server. Typically this would be a private IP, but public IPs are also allowed.

## 2\. Add a target

A target represents a single resource in your infrastructure (such as a server, Kubernetes cluster, database, or container) that users will connect to through Cloudflare.

 Create a target for each Windows machine that requires RDP access. To create a new target:

* [ Dashboard ](#tab-panel-7309)
* [ API ](#tab-panel-7310)
* [ Terraform ](#tab-panel-7311)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Targets**.
2. Select **Add a target**.
3. In **Target hostname**, enter a user-friendly name for the target. We recommend using the server hostname, for example `production-server`. The target hostname does not need to be unique and can be reused for multiple targets. Hostnames are used to define the targets secured by an Access application; they are not used for DNS address resolution.  
Hostname format restrictions  
   * Case insensitive  
   * Contain no more than 253 characters  
   * Contain only alphanumeric characters, `-`, or `.` (no spaces allowed)  
   * Start and end with an alphanumeric character
4. In **IP addresses**, enter the IPv4 and/or IPv6 address of the target resource. The dropdown menu will not populate until you type in the full IP address.

Note

If the target IP does not appear in the dropdown, go to **Networks** \> **Routes** and confirm that the IP routes through Cloudflare Tunnel.

1. In the dropdown menu, select the IP address and [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) where the resource is located. This IP address and virtual network pairing is now assigned to this target and cannot be reused in another target by design.
2. Select **Add target**.

Make a `POST` request to the [Infrastructure Access Targets](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/infrastructure/subresources/targets/methods/create/) endpoint:

Create new target

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "hostname": "infra-access-target",

    "ip": {

        "ipv4": {

            "ip_addr": "187.26.29.249",

            "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"

        },

        "ipv6": {

            "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",

            "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"

        }

    }

  }'


```

Provider versions

The following example requires Cloudflare provider version `>=4.45.0`.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Configure the [cloudflare\_zero\_trust\_infrastructure\_access\_target ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/zero%5Ftrust%5Finfrastructure%5Faccess%5Ftarget) resource:  
```  
resource "cloudflare_zero_trust_infrastructure_access_target" "infra-ssh-target" {  
  account_id = var.cloudflare_account_id  
    hostname   = "infra-access-target"  
    ip = {  
      ipv4 = {  
        ip_addr = "187.26.29.249"  
        virtual_network_id = "c77b744e-acc8-428f-9257-6878c046ed55"  
      }  
      ipv6 = {  
        ip_addr = "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0"  
        virtual_network_id = "c77b744e-acc8-428f-9257-6878c046ed55"  
      }  
    }  
}  
```

Next, create an Access application to secure the target.

## 3\. Create a DNS record

To make your RDP targets (that is, your Windows machines) available through the browser, you will need a [Cloudflare DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) for the domain and subdomain that users will connect to. This domain will be used to access any targets that are available to users through your Access application (see Step 4).

For example, if want users to connect to targets on `rdp.example.com`, [create a DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) for `rdp.example.com`. You can create either an `A`, `AAAA`, or `CNAME` record:

A record

The following DNS record points your public subdomain (`rdp`) to an IPv4 address in the [Class E address space ↗](https://datatracker.ietf.org/doc/html/rfc5735).

* **Type**: _A_
* **Name**: `rdp`
* **IPv4 address**: `240.0.0.0`
* **Proxy status**: On

AAAA record

The following DNS record points your public subdomain (`rdp`) to the IPv6 [discard address range ↗](https://www.rfc-editor.org/rfc/rfc6666.html):

* **Type**: _AAAA_
* **Name**: `rdp`
* **IPv6 address**: `100::`
* **Proxy status**: On

CNAME record

The following `CNAME` record points your public subdomain (`rdp`) to a fully qualified domain name.

* **Type**: _CNAME_
* **Name**: `rdp`
* **Target**: `www.rdp.example.com`
* **Proxy status**: On

The CNAME **Target** field is unrelated to the RDP targets configured in Step 2.

The DNS record does not need to point to an active destination IP address or hostname; the DNS record just needs to be valid. Cloudflare's RDP proxy will handle the routing to the correct RDP target.

## 4\. Create an Access application

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **Self-hosted and private**.
4. Select **Add public hostname**.  
Note  
Browser-based RDP is only compatible with public hostnames. If you add a private hostname or IP, RDP functionality will not be available in this application.
5. In the **Domain** dropdown, select the domain that will represent the application. Domains must belong to an active zone in your Cloudflare account. You can use [wildcards](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/) to protect multiple parts of an application that share a root path.  
Alternatively, to use a [Cloudflare for SaaS custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/), select **Switch to custom input** and enter your custom hostname.  
Note  
You can only enable browser-based RDP on domains and subdomains, not for specific paths. The selected domain and subdomain must also have a corresponding DNS record (refer to [Step 3](#3-create-a-dns-record)).
6. Turn on **Allow access through browser-based RDP, SSH, or VNC sessions**, then select _RDP_ from the dropdown menu.
7. In **Target criteria**, select the [target hostname(s)](#2-add-a-target) that define your RDP servers. The application definition will apply to all targets that share the selected target hostname, including any targets added in the future.
8. In **Port**, enter the [RDP listening port ↗](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/change-listening-port) of your server. It will likely be port `3389`.
9. (Optional) If you run RDP on more than one port, select **Add new target criteria** and reconfigure the same target hostname(s) with the different port number.
10. Under **Access policies**, add an existing policy or [create a new policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) to control who can connect to your application. All Access applications are deny by default -- a user must match an Allow policy before they are granted access.  
Note  
Ensure that only **Allow** or **Block** policies are present. **Bypass** and **Service Auth** are not supported for browser-rendered applications.
11. (Optional) In your Access policy, configure [clipboard controls](#clipboard-controls) to restrict copy and paste actions between the user's local machine and the browser-based RDP session.
12. Configure how users will authenticate:  
   1. Select the [identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) you want to enable for your application.  
   2. (Recommended) If you plan to only allow access via a single IdP, turn on **Apply instant authentication**. End users will not be shown the [Cloudflare Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/). Instead, Cloudflare will redirect users directly to your SSO login event.  
   3. **Authenticate with Cloudflare One Client** is not supported for browser-based RDP and should remain turned off.
13. In **Session Duration**, choose how often the user's [application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/) should expire.  
Cloudflare checks every HTTP request to your application for a valid application token. If the user's application token (and global token) has expired, they will be prompted to reauthenticate with the IdP. For more information, refer to [Session management](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/).
14. (Optional) Go to the **Additional settings** tab to customize the application experience:  
   * **App Launcher customization**: The [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) allows users to view the Windows servers that they can access using browser-based RDP. Cloudflare recommends keeping **Show application in App Launcher** turned on. Without the App Launcher, users will need to know each target's direct URL.  
   Note  
   Ensure that users match an Allow rule in your [App Launcher policies](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/#enable-the-app-launcher).  
   * **Custom block pages**: Choose what users will see when they are denied access to the application.  
         * **Cloudflare default**: Reload the [login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/) and display a block message below the Cloudflare Access logo. The default message is `That account does not have access`, or you can enter a custom message.  
         * **Redirect URL**: Redirect to the specified website.  
         * **Custom page template**: Display a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/) hosted in Cloudflare One.  
   * [**Cross-Origin Resource Sharing (CORS) settings**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/cors/)  
   * [**Cookie settings**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#cookie-settings)  
   * **401 Response for Service Auth policies**: Return a `401` response code when a user (or machine) makes a request to the application without the correct [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).
15. Select **Create**.

## 5\. (Recommended) Modify order of precedence in Gateway

By default, Cloudflare will evaluate Access application policies after evaluating all [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/). To evaluate Access applications before or after specific Gateway policies:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**. In **Network**, [create a Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) with the following configuration:  
| Selector                     | Operator | Value     | Action |  
| ---------------------------- | -------- | --------- | ------ |  
| Access Infrastructure Target | is       | _Present_ | Allow  |
2. Ensure that **Enforce Cloudflare One Client session duration** is turned off, otherwise users will be blocked from accessing RDP targets.
3. Update the policy's [order of precedence](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence)using the dashboard or API.

 This Gateway policy will apply to all Access for Infrastructure targets, including RDP and SSH. 

Note

Users must pass the policies in your Access application before they are granted access. The Gateway Allow policy is strictly for routing and connectivity purposes.

## 6\. Connect as a user

To connect to a Windows machine over RDP:

1. Open a browser and go to your App Launcher URL:  
```  
https://<your-team-name>.cloudflareaccess.com  
```  
Replace `<your-team-name>` with your Zero Trust team name.
2. Follow the prompts to log in to your identity provider.  
Once you have authenticated, the App Launcher will display tiles showing the applications that you are authorized to use. Windows servers (targets) available through browser-based RDP will also appear as tiles. If a target is reachable through multiple Access applications, the target will have a tile per Access application.
3. Select the target you want to connect to.  
The App Launcher tile will launch a URL of the form `https://<app-domain>/rdp/<vnet-id>/<target-ip>/<port>`. You may also navigate directly to this URL.  
Virtual network ID  
`vnet-id` refers to the [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) (VNET) that the RDP target is assigned to in your Cloudflare Tunnel configuration. If you did not specify a VNET when routing the target through Cloudflare Tunnel, the target is automatically added to the default VNET.  
To fetch a list of all VNETs and their IDs, make a `GET` request to the [List Virtual Networks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/virtual%5Fnetworks/methods/list/) endpoint. The default VNET will have the parameter `"is_default_network": true`.
4. Select the port that you want to connect to. The port selection screen only appears if the Access application allows RDP traffic on multiple ports (for example, port `3389` and port `65321`).
5. (Optional) In your browser settings, allow the Access application to access the clipboard. Clipboard access is subject to [policy restrictions](#configure-clipboard-controls) configured by your administrator.  
Note  
Automatic clipboard sharing only works by default in Chromium-based browsers; Firefox requires additional configuration. Refer to [Known limitations](#known-limitations) for details.
6. Enter your Windows username and password. For more information on how to format your username, refer to [User identifier formats](#user-identifier-formats).

You now have access to the remote Windows desktop.

## Clipboard controls

Clipboard controls allow you to restrict whether users can copy or paste text between their local machine and the browser-based RDP session. They are are configured per policy within your Access application. You can configure different clipboard permissions for different groups of users by creating multiple policies.

### Default behavior

* **New policies**: Clipboard access is denied by default. You must explicitly allow clipboard actions.
* **Existing applications**: Access applications for browser-based RDP created before this feature was available retain full clipboard access to preserve backward compatibility.

### Available settings

For each Access policy, you can choose one of the following clipboard control options:

| Setting                                | Description                                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| _Client to remote RDP session allowed_ | Users can copy and paste text from their local client into the browser-based RDP session.                  |
| _Remote RDP session to client allowed_ | Users can copy and paste text from the browser-based RDP session to their local client.                    |
| _Both directions allowed_              | Users can copy and paste text between the browser-based RDP session and their local client.                |
| _Off_                                  | Users are not allowed to copy and paste text between the browser-based RDP session and their local client. |

When a user attempts a restricted clipboard action, the clipboard content is replaced with a message informing them that the action is not allowed.

### Configure clipboard controls

* [ Dashboard ](#tab-panel-7306)
* [ API ](#tab-panel-7307)
* [ Terraform ](#tab-panel-7308)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Locate your browser-based RDP application and select **Configure**.
3. Select the **Policies** tab.
4. Create a new policy or select an existing policy to edit.
5. Expand **Connection context**.
6. Under **RDP data flow control**, choose a **Text clipboard control** setting. Refer to [Available settings](#available-settings) for setting descriptions.
7. Select **Save policy**.

When [creating or updating an Access policy](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/policies/) for an RDP application, configure the allowed copy/paste formats in each direction. For example, the following policy allows users to copy text from their local client into the browser-based RDP session, but blocks copying content out of the RDP session.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow engineers with restricted clipboard",

    "decision": "allow",

    "include": [

        {

            "email_domain": {

                "domain": "example.com"

            }

        }

    ],

    "connection_rules": {

        "rdp": {

            "allowed_clipboard_local_to_remote_formats": [

                "text"

            ],

            "allowed_clipboard_remote_to_local_formats": []

        }

    }

  }'


```

Using the `connection_rules` attribute within a [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource, configure the allowed copy/paste formats in each direction. For example, the following policy allows users to copy text from their local client into the browser-based RDP session, but blocks copying content out of the RDP session.

```

resource "cloudflare_zero_trust_access_policy" "rdp-policy" {

  account_id = var.cloudflare_account_id

  name       = "Allow engineers with restricted clipboard"

  decision   = "allow"


  include = [

    {

      email_domain = {

        domain = "example.com"

      }

    }

  ]


  connection_rules = {

    rdp = {

      allowed_clipboard_local_to_remote_formats = ["text"]

      allowed_clipboard_remote_to_local_formats = []

    }

  }

}


```

## Compatibility

### RDP server operating systems

Browser-based RDP supports connecting to Windows machines that run the following operating systems:

* Windows 11 Pro
* Windows 11 Enterprise
* Windows 10 Pro
* Windows 10 Enterprise
* Windows Server 2025
* Windows Server 2022
* Windows Server 2019
* Windows Server 2016

### Browsers

| Browser                                      | Compatibility |
| -------------------------------------------- | ------------- |
| Google Chrome                                | ✅             |
| Mozilla Firefox                              | ✅             |
| Safari                                       | ✅             |
| Microsoft Edge (Chromium-based)              | ✅             |
| Other Chromium-based browsers (Opera, Brave) | ✅             |
| Internet Explorer 11 and below               | ❌             |

### Powershell

Run Powershell 7 or higher to mitigate a prior Microsoft issue where keystrokes are not recorded.

### User identifier formats

Browser-based RDP supports connecting to Windows machines using the following login credentials:

#### Security Account Manager (SAM)

SAM-formatted user identifiers are supported with and without spaces.

Examples:

* `DOMAIN\username`
* `DOMAIN\username with spaces`
* `.\username`
* `.\username with spaces`
* `username`
* `username with spaces`

Character limits

Identifiers which specify a domain, such as `DOMAIN\username`, can have a maximum of 20 characters for the domain and 15 characters for the username.

Identifiers without a domain, such as `.\username`, will use the default domain. The username can have a maximum of 20 characters.

#### User Principal Name (UPN)

UPN-formatted user identifiers are supported with spaces, with and without quotes.

Examples:

* `"username with spaces"@domain.org`
* `username with spaces@domain.org`
* `username@domain.org`

Note

Cloudflare will not configure user identifiers on the RDP target. Any user identifier used to authenticate must be pre-configured on the server.

#### Microsoft Entra ID

User identifiers that are bound to Microsoft Entra ID domains must enter their username as `AzureAD\user@example.com` or `AzureAD\user`. The `AzureAD\` prefix is case-insensitive. The login flow differs slightly when using an Microsoft Entra ID-bound username:

1. Enter your username in one of the formats outlined above.
2. Once the username is entered, the password box will disappear and the RDP connection will initiate.
3. The RDP server will then prompt for the password before granting access to the RDP server.

### Cloudflare products

When using Access self-hosted applications, the majority of Cloudflare products will be compatible with your application.

However, the following products are not supported:

* [Automatic Platform Optimization](https://developers.cloudflare.com/automatic-platform-optimization)
* [Zaraz](https://developers.cloudflare.com/zaraz)
* [Google tag gateway for advertisers](https://developers.cloudflare.com/google-tag-gateway)

You can disable Zaraz for a specific application - instead of across your entire zone - using a [Configuration Rule](https://developers.cloudflare.com/rules/configuration-rules/) scoped to the application domain.

Google tag gateway is configured at the zone level and cannot be scoped to specific hostnames. To use Access binding cookie on a hostname, disable Google tag gateway for the entire zone.

## Known limitations

* **TLS certificate verification**: Cloudflare uses TLS to connect to the RDP target but does not verify the origin TLS certificate.
* **Device authentication identity**: Since browser-based RDP traffic does not go through the Cloudflare One Client, users cannot use their [Cloudflare One Client session identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/#configure-warp-sessions-in-access) to authenticate.
* **Audio over RDP**: Users cannot use their microphone and speaker to interact with the remote machine.
* **Clipboard size limit**: Data copied between the local machine and the browser-based RDP session may not exceed 500 KB.
* **Clipboard data types**: Clipboard controls only support text data. Image and file clipboard transfers are not supported.
* **File transfers**: Users cannot transfer files from their local machine to the remote machine and vice versa.
* **Print to local printer**: Users cannot print information from their browser-based RDP session to a printer in their local network.
* **Network Level Authentication for Entra-joined accounts**: Browser-based RDP does not support PKU2U authentication which is required for [Network Level Authentication (NLA) ↗](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access#why-allow-connections-only-with-network-level-authentication) with Entra-joined accounts. Connecting to Entra-joined accounts requires disabling enforcement of NLA on the remote Windows machine. You can disable NLA from **Settings** \> **System** \> **Remote Desktop**, or use the Local Group Policy Editor to disable **Require user authentication for remote connections by using Network Level Authentication**.
* **Clipboard browser compatibility**: Automatic clipboard sharing between the local and remote machine is only available in Chromium-based browsers by default (Google Chrome, Microsoft Edge, Opera, Brave). To enable this functionality in Firefox:  
   1. Type `about:config` into the browser address bar and press **Enter**.  
   2. Accept the warning prompt if displayed.  
   3. Search for `dom.events.testing.asyncClipboard` and set it to `true`.  
   4. Search for `dom.events.asyncClipboard.clipboardItem` and set it to `true`.  
   5. Search for `dom.events.asyncClipboard.readText` and set it to `true`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/#page","headline":"Connect to RDP in a browser · Cloudflare One docs","description":"Connect to RDP in a browser in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["RDP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/","name":"RDP"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/","name":"Connect to RDP in a browser"}}]}
```
