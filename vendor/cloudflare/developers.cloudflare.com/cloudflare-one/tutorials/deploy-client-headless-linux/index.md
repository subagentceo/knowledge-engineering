---
title: Deploy the Cloudflare One Client on headless Linux machines
description: This tutorial explains how to deploy the Cloudflare One Client on headless Linux devices using a service token and an installation script.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy the Cloudflare One Client on headless Linux machines

**Last reviewed:**  9 months ago 

This tutorial explains how to deploy the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) on Linux devices using a service token and an installation script. This deployment workflow is designed for headless servers - that is, servers which do not have access to a browser for identity provider logins - and for situations where you want to fully automate the onboarding process. Because devices will not register through an identity provider, [identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) and logging will be unavailable.

Note

This tutorial focuses on deploying the Cloudflare One Client as an endpoint device agent. If you are looking to deploy the Cloudflare One Client as a gateway to a private network, refer to the [Cloudflare Mesh documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/).

## Prerequisites

* [Cloudflare Zero Trust account](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization)

## 1\. Create a service token

Fully automated deployments rely on a service token to enroll the Cloudflare One Client in your Zero Trust organization. You can use the same token to enroll multiple devices, or generate a unique token per device if they require different [device profile settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/).

To create a service token:

* [ Dashboard ](#tab-panel-7717)
* [ API ](#tab-panel-7718)
* [ Terraform (v5) ](#tab-panel-7719)

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

## 2\. Configure device enrollment permissions

Device enrollment permissions determine the users and devices that can register WARP with your Zero Trust organization.

To allow devices to enroll using a service token:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices**. Select the **Management** tab.
2. In **Device enrollment permissions**, select **Manage**.
3. In the **Policies** tab, select **Create new policy**. A new tab will open with the policy creation page.
4. For **Action**, select _Service Auth_.
5. For the **Selector** field, you have two options: you can either allow all service tokens (`Any Access Service Token`) or specific service tokens (`Service Token`). For example:  
| Rule Action  | Rule type | Selector      | Value        |  
| ------------ | --------- | ------------- | ------------ |  
| Service Auth | Include   | Service Token | <TOKEN-NAME> |
6. Save the policy.
7. Go back to **Device enrollment permissions** and add the newly created policy to your permissions.
8. Select **Save**.

## 3\. Create an installation script

You can use a shell script to automate WARP installation and registration. The following example shows how to deploy the Cloudflare One Client on Ubuntu 24.04.

1. In a terminal, create a new `.sh` file using a text editor. For example:  
Terminal window  
```  
vim install_warp.sh  
```
2. Press `i` to enter insert mode and add the following lines:  
```  
#!/bin/bash  
set -e  
# Download and install the Cloudflare One Client  
function warp() {  
    curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor --output /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg  
    echo "deb [signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list  
    sudo apt-get update --assume-yes  
    sudo apt-get install --assume-yes cloudflare-warp  
}  
# Create an MDM file with your Cloudflare One Client deployment parameters  
function mdm() {  
  sudo touch /var/lib/cloudflare-warp/mdm.xml  
  cat > /var/lib/cloudflare-warp/mdm.xml << "EOF"  
<dict>  
    <key>auth_client_id</key>  
    <string>88bf3b6d86161464f6509f7219099e57.access</string>  
    <key>auth_client_secret</key>  
    <string>bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5</string>  
    <key>auto_connect</key>  
    <integer>1</integer>  
    <key>onboarding</key>  
    <false/>  
    <key>organization</key>  
    <string>your-team-name</string>  
    <key>service_mode</key>  
    <string>warp</string>  
</dict>  
EOF  
}  
#main program  
warp  
mdm  
```
3. If you are using Debian or RHEL / CentOS, modify the `warp()` function so that it installs the correct [WARP package ↗](https://pkg.cloudflareclient.com/) for your OS.
4. Modify the values in the `mdm()` function:  
   1. For `auth_client_id` and `auth_client_secret`, replace the string values with the Client ID and Client Secret of your [service token](https://developers.cloudflare.com/cloudflare-one/tutorials/deploy-client-headless-linux/#1-create-a-service-token).  
   2. For `organization`, replace `your-team-name` with your Zero Trust team name.  
   3. (Optional) Add or modify other [Cloudflare One Client deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) according to your preferences.
5. Press `esc`, then type `:x` and press `Enter` to save and exit.

## 4\. Install WARP

To install the Cloudflare One Client using the example script:

1. Make the script executable:  
Terminal window  
```  
chmod +x install_warp.sh  
```
2. Run the script:  
Terminal window  
```  
sudo ./install_warp.sh  
```

The Cloudflare One Client is now deployed with the configuration parameters stored in `/var/lib/cloudflare-warp/mdm.xml`. Assuming [auto\_connect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#auto%5Fconnect) is configured, the Cloudflare One Client will automatically connect to your Zero Trust organization. Once connected, the device will appear in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Team & Resources** \> **Devices** with the email `non_identity@<team-name>.cloudflareaccess.com`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/deploy-client-headless-linux/#page","headline":"Deploy the Cloudflare One Client on headless Linux machines · Cloudflare One docs","description":"This tutorial explains how to deploy the Cloudflare One Client on headless Linux devices using a service token and an installation script.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/deploy-client-headless-linux/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Linux"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/deploy-client-headless-linux/","name":"Deploy the Cloudflare One Client on headless Linux machines"}}]}
```
