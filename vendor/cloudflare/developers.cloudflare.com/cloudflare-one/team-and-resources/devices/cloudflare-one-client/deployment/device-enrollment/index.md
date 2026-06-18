---
title: Device enrollment permissions
description: Device enrollment permissions in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Device enrollment permissions

Device enrollment permissions determine which users can connect new devices to your organization's Cloudflare Zero Trust instance.

## Set device enrollment permissions

* [ Dashboard ](#tab-panel-7478)
* [ Terraform (v5) ](#tab-panel-7479)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **Management**.
2. In **Device enrollment** \> **Device enrollment permissions**, select **Manage**.
3. In the **Policies** tab, configure one or more [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to define who can join their device. For example, you could allow all users with a company email address:  
| Rule type | Selector         | Value        |  
| --------- | ---------------- | ------------ |  
| Include   | Emails ending in | @company.com |

Note

Device posture checks are not supported in device enrollment policies. The Cloudflare One Client (formerly WARP) can only perform posture checks after the device is enrolled.

1. In the **Login methods** tab:  
a. Select the [identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) users can authenticate with. If you have not integrated an identity provider, you can use the [one-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/).  
b. (Optional) If you plan to only allow access via a single IdP, turn on **Apply instant authentication**. End users will not be shown the Cloudflare Access login page. Instead, Cloudflare will redirect users directly to your SSO login event.
2. Select **Save**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Apps and Policies Write`
2. Create a reusable Access policy using the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:  
```  
resource "cloudflare_zero_trust_access_policy" "allow_company_emails" {  
  account_id   = var.cloudflare_account_id  
  name         = "Allow company emails"  
  decision     = "allow"  
  include      = [  
    {  
      email_domain = {  
        domain = "@example.com"  
      }  
    }  
  ]  
}  
```
3. Use the [cloudflare\_zero\_trust\_access\_application ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fapplication) resource to create an application with type `warp`.  
```  
resource "cloudflare_zero_trust_access_application" "device_enrollment" {  
  account_id       = var.cloudflare_account_id  
  type             = "warp"  
  name             = "Warp device enrollment"  
  allowed_idps              = [cloudflare_zero_trust_access_identity_provider.microsoft_entra_id.id]  
  auto_redirect_to_identity = true  
  app_launcher_visible      = false  
  policies = [  
    {  
      id = cloudflare_zero_trust_access_policy.allow_company_emails.id  
      precedence = 1  
    }  
  ]  
}  
```

Users can now [enroll their device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) by logging in to your identity provider. To prevent users from logging out of your organization after they enroll, disable [Allow devices to leave organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-device-to-leave-organization) in your device client settings.

## Example policies

### Check for service token

Instead of requiring users to authenticate with their credentials, you can use a [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) to enroll devices without any user interaction. Because users are not required to log in to an identity provider, identity-based policies cannot be enforced on these devices.

To enroll devices using a service token:

* [ Dashboard ](#tab-panel-7480)
* [ Terraform (v5) ](#tab-panel-7481)

1. [Create a service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#create-a-service-token).
2. Copy the token's **Client ID** and **Client Secret**.
3. Go to **Access controls** \> **Policies** and create the following policy:  
| Rule Action  | Rule type | Selector      | Value        |  
| ------------ | --------- | ------------- | ------------ |  
| Service Auth | Include   | Service Token | <TOKEN-NAME> |  
Make sure to set **Action** to _Service Auth_ instead of _Allow_.
4. Add the Access policy to your [device enrollment permissions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#set-device-enrollment-permissions).
5. In your MDM [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/), add the following fields:  
   * `auth_client_id`: The **Client ID** of your service token.  
   * `auth_client_secret`: The **Client Secret** of your service token.

1. Add the following permissions to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Apps and Policies Write`  
   * `Access: Service Tokens Write`
2. [Create a service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#create-a-service-token) and copy its **Client ID** and **Client Secret**.
3. Create the following Access policy:  
```  
resource "cloudflare_zero_trust_access_policy" "warp_enrollment_service_token" {  
  account_id     = var.cloudflare_account_id  
  name           = "Allow service token"  
  decision       = "non_identity"  
  include = [  
    {  
      service_token = {  
        token_id = cloudflare_zero_trust_access_service_token.example_service_token.id  
      }  
    }  
  ]  
}  
```
4. Add the policy to your [cloudflared\_zero\_trust\_access\_application for the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#set-device-enrollment-permissions).
5. In your MDM [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/), add the following fields:  
   * `auth_client_id`: The **Client ID** of your service token.  
   * `auth_client_secret`: The **Client Secret** of your service token.

When you deploy the Cloudflare One Client with your MDM provider, the Cloudflare One Client will automatically connect the device to your Zero Trust organization.

You can verify which devices have enrolled by going to **Team & Resources** \> **Devices**. Devices that enrolled using a service token (or any other Service Auth policy) will have the **Email** field show as `non_identity@<team-name>.cloudflareaccess.com`.

### Check for mTLS certificate

Enterprise customers can enforce [mutual TLS authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/) during device enrollment.

Certificate requirements

* The CA certificate can be from a publicly trusted CA or self-signed.
* In the certificate `Basic Constraints`, the attribute `CA` must be set to `TRUE`.
* The certificate must use one of the signature algorithms listed below:  
Allowed signature algorithms  
`x509.SHA1WithRSA`  
`x509.SHA256WithRSA`  
`x509.SHA384WithRSA`  
`x509.SHA512WithRSA`  
`x509.ECDSAWithSHA1`  
`x509.ECDSAWithSHA256`  
`x509.ECDSAWithSHA384`  
`x509.ECDSAWithSHA512`

To check for an mTLS certificate:

* [ Dashboard ](#tab-panel-7482)
* [ Terraform (v5) ](#tab-panel-7483)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Mutual TLS**.
2. Select **Add mTLS Certificate**.
3. Enter any name for the root CA.
4. In **Certificate content**, paste the contents of your root CA.  
If the client certificate is directly signed by the root CA, you only need to upload the root. If the client certificate is signed by an intermediate certificate, you must upload the entire CA chain (intermediate and root). For example:  
```  
-----BEGIN CERTIFICATE-----  
<intermediate.pem>  
-----END CERTIFICATE-----  
-----BEGIN CERTIFICATE-----  
<rootCA.pem>  
-----END CERTIFICATE-----  
```
1. In **Associated hostnames**, enter your Zero Trust team domain: `<team-name>.cloudflareaccess.com`
2. In your [device enrollment permissions](#set-device-enrollment-permissions), add a _Common Name_ or _Valid Certificate_ rule. For example, the following policy requires a client certificate with a specific common name:  
| Action | Rule type | Selector    | Value              |  
| ------ | --------- | ----------- | ------------------ |  
| Allow  | Require   | Common Name | <CERT-COMMON-NAME> |
3. On your device, add the client certificate to the [system keychain](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#test-in-the-browser).

1. Add the following permissions to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Mutual TLS Certificates Write`  
   * `Access: Apps and Policies Write`
2. Use the [cloudflare\_zero\_trust\_access\_mtls\_certificate ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fmtls%5Fcertificate) resource to add an mTLS certificate to your account:  
```  
resource "cloudflare_zero_trust_access_mtls_certificate" "example_mtls_cert" {  
  account_id     = var.cloudflare_account_id  
  name           = "WARP enrollment mTLS cert"  
  certificate    = <<EOT  
  -----BEGIN CERTIFICATE-----  
  xxxx  
  xxxx  
  -----END CERTIFICATE-----  
  EOT  
  associated_hostnames = ["your-team-name.cloudflareaccess.com"]  
}  
```
3. Create the following Access policy:  
```  
resource "cloudflare_zero_trust_access_policy" "warp_enrollment_mtls" {  
  account_id     = var.cloudflare_account_id  
  name           = "Allow employees with mTLS cert"  
  decision       = "allow"  
  include = [  
    {  
      email_domain = {  
        domain = "@example.com"  
      }  
    }  
  ]  
  require = [  
    {  
      common_name = {  
        common_name = "Common name 1"  
      }  
    },  
        {  
      common_name = {  
        common_name = "Common name 2"  
      }  
    }  
  ]  
}  
```
4. Add the policy to your [cloudflared\_zero\_trust\_access\_application for the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#set-device-enrollment-permissions).
5. On your device, add the client certificate to the [system keychain](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#test-in-the-browser).

When users [log in to your Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) from the Cloudflare One Client, their device must present a valid client certificate in order to connect.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#page","headline":"Device enrollment permissions · Cloudflare One docs","description":"Device enrollment permissions in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/","name":"Device enrollment permissions"}}]}
```
