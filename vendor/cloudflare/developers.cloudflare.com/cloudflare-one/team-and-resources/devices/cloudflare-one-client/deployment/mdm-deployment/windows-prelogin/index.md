---
title: Connect the Cloudflare One Client before Windows login
description: Connect the Cloudflare One Client before Windows login in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect the Cloudflare One Client before Windows login

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode DNS only mode  Traffic only mode  Local proxy mode                                                            | All plans                                                       |

| System   | Availability | Minimum WARP version |
| -------- | ------------ | -------------------- |
| Windows  | ✅            | 2025.6.1400.0        |
| macOS    | ❌            |                      |
| Linux    | ❌            |                      |
| iOS      | ❌            |                      |
| Android  | ❌            |                      |
| ChromeOS | ❌            |                      |

With Cloudflare Zero Trust, you can use an on-premise Active Directory (or similar) server to validate a remote user's Windows login credentials. Before the user enters their Windows login information for the first time, the Cloudflare One Client (formerly WARP) establishes a connection using a service token. This initial connection is not associated with a user identity. Once the user completes the Windows login, the Cloudflare One Client switches to an identity-based session and applies the user registration to all future logins.

## Prerequisites

* Active Directory resources are [connected to Cloudflare](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/).

## 1\. Create a service token

* [ Dashboard ](#tab-panel-7490)
* [ API ](#tab-panel-7491)
* [ Terraform (v5) ](#tab-panel-7492)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
2. Select **Create Service Token**.
3. Name the service token. The name allows you to easily identify events related to the token in the logs and to revoke the token individually.
4. Choose a **Service Token Duration**. This sets the expiration date for the token.
5. Select **Generate token**. You will see the generated Client ID and Client Secret for the service token, as well as their respective request headers.
6. Copy the Client Secret.  
Warning  
This is the only time Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.

1. Make a `POST` request to the [Access Service Tokens](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/create/) endpoint:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Service Tokens Write`  
Create a service token  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "CI/CD token",  
    "duration": "8760h"  
  }'  
```
2. Copy the `client_id` and `client_secret` values returned in the response.  
Response  
```  
"result": {  
  "client_id": "88bf3b6d86161464f6509f7219099e57.access",  
  "client_secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5",  
  "created_at": "2025-09-25T22:26:26Z",  
  "expires_at": "2026-09-25T22:26:26Z",  
  "id": "3537a672-e4d8-4d89-aab9-26cb622918a1",  
  "name": "CI/CD token",  
  "updated_at": "2025-09-25T22:26:26Z",  
  "duration": "8760h",  
  "client_secret_version": 1  
}  
```  
Warning  
This is the only time Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Service Tokens Write`
2. Configure the [cloudflare\_zero\_trust\_access\_service\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fservice%5Ftoken) resource:  
```  
resource "cloudflare_zero_trust_access_service_token" "example_service_token" {  
  account_id = var.cloudflare_account_id  
  name       = "Example service token"  
  duration  = "8760h"  
  lifecycle {  
    create_before_destroy = true  
  }  
}  
```
3. Get the Client ID and Client Secret of the service token:  
Example: Output to CLI  
   1. Output the Client ID and Client Secret to the Terraform state file:  
   ```  
   output "example_service_token_client_id" {  
     value     = cloudflare_zero_trust_access_service_token.example_service_token.client_id  
   }  
   output "example_service_token_client_secret" {  
     value     = cloudflare_zero_trust_access_service_token.example_service_token.client_secret  
     sensitive = true  
   }  
   ```  
   2. Apply the configuration:  
   Terminal window  
   ```  
   terraform apply  
   ```  
   3. Read the Client ID and Client Secret:  
   Terminal window  
   ```  
   terraform output -raw example_service_token_client_id  
   ```  
   Terminal window  
   ```  
   terraform output -raw example_service_token_client_secret  
   ```  
Example: Store in HashiCorp Vault  
```  
  resource "vault_generic_secret" "example_service_token" {  
    path         = "kv/cloudflare/example_service_token"  
    data_json = jsonencode({  
      "CLIENT_ID"     = cloudflare_access_service_token.example_service_token.client_id  
      "CLIENT_SECRET" = cloudflare_access_service_token.example_service_token.client_secret  
    })  
  }  
```

## 2\. Create a device enrollment policy

In your [device enrollment permissions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#set-device-enrollment-permissions), create the following policy:

| Rule Action  | Rule type | Selector      | Value        |
| ------------ | --------- | ------------- | ------------ |
| Service Auth | Include   | Service Token | <TOKEN-NAME> |

## 2\. (Optional) Restrict access during pre-login

Devices enrolled via a service token are identified by the email address `non_identity@<team-name>.cloudflareaccess.com`. Using this email address, you can apply specific [device profile settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) and [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) during the pre-login state. For example, you could provide access to only those resources necessary to complete the Windows login and/or device management activities.

Example device profile rule

| Selector         | Operator | Value                                          | Logic |
| ---------------- | -------- | ---------------------------------------------- | ----- |
| User email       | in       | non\_identity@<team-name>.cloudflareaccess.com | And   |
| Operating system | is       | Windows                                        |       |

Example Gateway network policy

| Selector                     | Operator | Value                                          | Logic |
| ---------------------------- | -------- | ---------------------------------------------- | ----- |
| Destination IP               | in list  | Active Directory servers                       | And   |
| User email                   | in       | non\_identity@<team-name>.cloudflareaccess.com | And   |
| Passed Device Posture Checks | in       | Windows 10 or higher (OS version)              |       |

| Action |
| ------ |
| Allow  |

## 3\. Configure the MDM file

To enable the Windows pre-login feature, an MDM file in the following format must be [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#windows) on the device. In the following example, the `pre_login` key allows the device to connect using the service token, while `configs` contains your default Zero Trust configuration.

```

<dict>

  <key>pre_login</key>

  <dict>

    <key>organization</key>

    <string>mycompany</string>

    <key>auth_client_id</key>

    <string>TOKEN-ID</string>

    <key>auth_client_secret</key>

    <string>TOKEN-SECRET</string>

  </dict>

  <key>configs</key>

  <array>

    <dict>

      <key>organization</key>

      <string>mycompany</string>

      <key>display_name</key>

      <string>Default</string>

    </dict>

  </array>

</dict>


```

The Cloudflare One Client will apply the pre-login configuration when no other Cloudflare One Client registration exists and the user has not yet logged into Windows. When the pre-login configuration is in effect, the device will appear on **Team & Resources** \> **Devices** with the email `non_identity@<team-name>.cloudflareaccess.com`.

After the user logs into Windows, the Cloudflare One Client will automatically switch to the default MDM configuration and prompt the user to authenticate with the IdP. Once authenticated, the Cloudflare One Client registers and connects with the user identity. The **Team & Resources** \> **Devices** page will now show a new device associated with the user's email.

If [multi-user mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/) is turned off, this user registration will be used for any subsequent connections, including before the next Windows user login. Deleting the user registration would cause the Cloudflare One Client to switch back to the pre-login configuration as soon as the user logs out of Windows.

To learn how the pre-login configuration works with [multi-user mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/), refer to the [Cloudflare One Client registration flowchart](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/#cloudflare-one-client-registration-logic).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-prelogin/#page","headline":"Connect the Cloudflare One Client before Windows login · Cloudflare One docs","description":"Connect the Cloudflare One Client before Windows login in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-prelogin/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Windows"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-prelogin/","name":"Connect the Cloudflare One Client before Windows login"}}]}
```
