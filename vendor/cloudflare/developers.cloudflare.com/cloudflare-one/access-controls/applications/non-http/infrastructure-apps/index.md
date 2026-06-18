---
title: Add an infrastructure application
description: Add an infrastructure application in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add an infrastructure application

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode Traffic only mode                                                                                             | All plans                                                       |

| System   | Availability |
| -------- | ------------ |
| Windows  | ✅            |
| macOS    | ✅            |
| Linux    | ✅            |
| iOS      | ✅            |
| Android  | ✅            |
| ChromeOS | ✅            |

Access for Infrastructure allows you to have granular control over how users access individual servers, clusters, or databases. By adding an infrastructure application to Cloudflare Access, you can configure how users authenticate to the resource as well as control and authorize the ports, protocols, and usernames that they can connect with. Access and command logs ensure regulatory compliance and allow for auditing of user activity in case of a security breach.

Note

Access for Infrastructure currently only supports [SSH](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/). To connect using other protocols, [add a self-hosted private application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/). For browser-based SSH, RDP, or VNC, refer to [browser-rendered terminal](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/browser-rendering/).

## Prerequisites

* [Connect your infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/) to Cloudflare using `cloudflared` or Cloudflare Mesh.
* [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on user devices in Traffic and DNS mode.

## 1\. Add a target

A target represents a single resource in your infrastructure (such as a server, Kubernetes cluster, database, or container) that users will connect to through Cloudflare.

Targets are protocol-agnostic, meaning that you do not need to define a new target for each protocol that runs on the server. To create a new target: 

* [ Dashboard ](#tab-panel-7117)
* [ API ](#tab-panel-7118)
* [ Terraform ](#tab-panel-7119)

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

## 2\. Add an infrastructure application

* [ Dashboard ](#tab-panel-7120)
* [ API ](#tab-panel-7121)
* [ Terraform (v4) ](#tab-panel-7122)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **Infrastructure**.
4. Enter any name for the application.
5. In **Target criteria**, select the target hostname(s) that you want to secure. This application definition will apply to all targets that share the selected hostname, including any targets added in the future. Similarly, if you later decide to change the hostname for a target, the renamed target will no longer be covered by this application.
6. Enter the **Protocol** and **Port** that will be used to connect to the server.
7. (Optional) If a protocol runs on more than one port, select **Add new target criteria** and reconfigure the same target hostname and protocol with a different port number.  
Note  
Access for Infrastructure only supports assigning one protocol per port. You can reuse a port/protocol pairing across infrastructure applications, but the port cannot be reassigned to another protocol.
8. Select **Next**.
9. To secure your targets, configure a policy that defines who can connect and how they can connect:  
   1. Enter any name for your policy.  
   2. Create a rule that matches the users who are allowed to reach the targets. For more information, refer to [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) and review the list of [infrastructure policy selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#infrastructure-policy-selectors).  
   3. In **Connection context**, configure the following settings:  
         * **SSH user**: Enter the UNIX usernames that users can log in as (for example, `root` or `ec2-user`).  
         * **Allow users to log in as their email alias**: (Optional) When selected, users who match your policy definition will be able to access the target using their lowercased email address prefix. For example, `Jdoe@company.com` could log in as `jdoe`.  
   Note  
   Cloudflare will not create new users on the target. UNIX users must already be present on the server.
10. Select **Add application**.

Make a `POST` request to the [Access applications](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Add an Access application

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Example infrastructure app",

    "type": "infrastructure",

    "target_criteria": [

        {

            "target_attributes": {

                "hostname": [

                    "infra-access-target"

                ]

            },

            "port": 22,

            "protocol": "SSH"

        }

    ],

    "policies": [

        {

            "name": "Allow a specific email",

            "decision": "allow",

            "include": [

                {

                    "email": {

                        "email": "jdoe@company.com"

                    }

                }

            ],

            "connection_rules": {

                "ssh": {

                    "usernames": [

                        "root",

                        "ec2-user"

                    ]

                }

            }

        }

    ]

  }'


```

Provider versions

The following example requires Cloudflare provider version `>=4.45.0`.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/api%5Ftoken):  
   * `Access: Apps and Policies Write`
2. Use the [cloudflare\_zero\_trust\_access\_application ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/zero%5Ftrust%5Faccess%5Fapplication) resource to create an infrastructure application:  
```  
resource "cloudflare_zero_trust_access_application" "infra-app" {  
  account_id = var.cloudflare_account_id  
  name       = "Example infrastructure app"  
  type       = "infrastructure"  
  target_criteria {  
    port     = 22  
    protocol = "SSH"  
    target_attributes {  
      name = "hostname"  
      values = ["infra-access-target"]  
    }  
  }  
}  
```
3. Use the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/4.45.0/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource to add an infrastructure policy to the application:  
```  
resource "cloudflare_zero_trust_access_policy" "infra-app-policy" {  
  application_id = cloudflare_zero_trust_access_application.infra-app.id  
  account_id = var.cloudflare_account_id  
  name       = "Allow a specific email"  
  decision   = "allow"  
  precedence = 1  
  include {  
    email = ["jdoe@company.com"]  
  }  
  connection_rules {  
    ssh {  
      usernames = ["root", "ec2-user"]  
    }  
  }  
}  
```

The targets in this application are now secured by your infrastructure policies.

## 3\. (Recommended) Modify order of precedence in Gateway

By default, Cloudflare will evaluate Access application policies after evaluating all [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/). To evaluate Access applications before or after specific Gateway policies:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**. In **Network**, [create a Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) with the following configuration:  
| Selector                     | Operator | Value     | Action |  
| ---------------------------- | -------- | --------- | ------ |  
| Access Infrastructure Target | is       | _Present_ | Allow  |
2. Update the policy's [order of precedence](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence)using the dashboard or API.

 This Gateway policy will apply to all Access for Infrastructure targets, including RDP and SSH. 

Note

Users must pass the policies in your Access application before they are granted access. The Gateway Allow policy is strictly for routing and connectivity purposes.

## 4\. Configure the server

Certain protocols require configuring the server to trust connections through Access for Infrastructure. For more information, refer to the protocol-specific tutorial:

* [SSH](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#6-configure-ssh-server)

## 5\. Connect as a user

Users connect to the target's IP address using their preferred client software. The user must be logged into the Cloudflare One Client on their device, but no other system configuration is required. You can optionally configure a [private DNS resolver](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to allow connections to the target's private hostname.

### Connect to different VNET

To connect to targets that are in different VNETS, users will need to [switch their connected virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/#connect-to-a-virtual-network) in the Cloudflare One Client.

Note

If a user is connected to a target in VNET-A and needs to connect to a target in VNET-B, switching their VNET will not break any existing connections to targets within VNET-A. At present, connections are maintained between VNETs.

### Display available targets

Feature availability

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2024.9.346.0           |
| macOS    | ✅            | 2024.9.346.0           |
| Linux    | ✅            | 2024.9.346.0           |
| iOS      | ❌            |                        |
| Android  | ❌            |                        |
| ChromeOS | ❌            |                        |

Users can use `warp-cli` to display a list of targets they can access. On the device, open a terminal and run the following command:

Terminal window

```

warp-cli target list


```

```

╭──────────────────────────────────────┬──────────┬───────┬───────────────────────┬──────────────────────┬────────────╮

│ Target ID                            │ Protocol │ Port  │ Attributes            │ IP (Virtual Network) │ Usernames  │

├──────────────────────────────────────┼──────────┼───────┼───────────────────────┼──────────────────────┼────────────┤

│ 0193f22a-9df3-78e3-b5bb-7ab631903306 │ SSH      │ 22    │ hostname: do-target   │ 10.116.0.3 (a1net)   │ alice      │

├──────────────────────────────────────┼──────────┼───────┼───────────────────────┼──────────────────────┼────────────┤

│ 0193f22a-9df3-78e3-b5bb-7ab631903306 │ SSH      │ 23    │ hostname: do-target   │ 10.116.0.3 (a1net)   │ root       │

├──────────────────────────────────────┼──────────┼───────┼───────────────────────┼──────────────────────┼────────────┤

│ 01943cff-6130-7989-8bff-cbc02b59a2b1 │ SSH      │ 80    │ hostname: az-target   │ 172.16.0.0 (b1net)   │ alice, bob │

╰──────────────────────────────────────┴──────────┴───────┴───────────────────────┴──────────────────────┴────────────╯


```

You can optionally add flags to filter the output. For example:

Terminal window

```

warp-cli target list --attribute hostname=do-target --username root


```

To view all available filters, type `warp-cli target list --help`.

## Revoke a user's session

To revoke a user's access to all infrastructure targets, you can either [revoke the user from Zero Trust](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) or revoke their device. Cloudflare does not currently support revoking a user's session for a specific target.

## Granular target permissions

Infrastructure Access supports granular read permissions through [Cloudflare's role-based access control](https://developers.cloudflare.com/fundamentals/manage-members/roles/). Administrators can assign read-only roles scoped to specific targets instead of granting account-wide access. When a user with a scoped role calls the targets list API, the response is automatically filtered to only include the targets they have permission to view.

This is useful for organizations that want to give teams visibility into their own infrastructure targets without exposing the full target inventory.

## Infrastructure policy selectors

The following [Access policy selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors) are available for securing infrastructure applications:

* Email
* Emails ending in
* SAML group
* Country
* Authentication method
* Device posture
* Entra group, GitHub organization, Google Workspace group, Okta group

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#page","headline":"Add an infrastructure application · Cloudflare One docs","description":"Add an infrastructure application in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH","Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/","name":"Non-HTTP applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/","name":"Add an infrastructure application"}}]}
```
